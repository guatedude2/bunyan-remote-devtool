/**
 * Original code from "react-inspector"
 * Author: xyc (https://github.com/xyc)
 * Source: https://github.com/xyc/react-inspector
 */
import React from 'react';
import classnames from 'classnames';
import intersperse from '../utils/intersperse';

import { DEFAULT_ROOT_PATH, getIsExpandable, getPathsState } from '../utils/path-utils';

export default class ObjectInspector extends React.Component {


  static propTypes = {
    name: React.PropTypes.string,
    data: React.PropTypes.any,
    showNonenumerable: React.PropTypes.bool, // switch to show non-enumerable properties
    isNonenumerable: React.PropTypes.bool, // am myself a non-enumerable property? for styling purposes
    expandLevel: React.PropTypes.number,
    expandPaths: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]),
    depth: React.PropTypes.number.isRequired,
    path: React.PropTypes.string, // path is dot separated property names to reach the current node
    setExpanded: React.PropTypes.func,
    getExpanded: React.PropTypes.func
  };

  static defaultProps = {
    name: void 0,
    data: undefined,

    showNonenumerable: false,
    isNonenumerable: false,

    expandLevel: undefined,
    expandPaths: undefined,

    depth: 0,
    path: DEFAULT_ROOT_PATH
  };

  constructor(props) {
    super(props);

    if(props.depth === 0){ // root node
      this.state = {
        expandedPaths: getPathsState(
          props.showNonenumerable,
          props.expandLevel,
          props.expandPaths,
          props.data,
          props.name
        )
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.depth === 0){
      this.setState({
        expandedPaths: getPathsState(
          nextProps.showNonenumerable,
          nextProps.expandLevel,
          nextProps.expandPaths,
          nextProps.data,
          nextProps.name,
          this.state.expandedPaths
        )
      });
    }
  }

  componentWillMount(){
    if (typeof React.initializeTouchEvents === 'function') {
      React.initializeTouchEvents(true);
    }
  }

  getExpanded(path){
    const expandedPaths = this.state.expandedPaths;
    if (expandedPaths !== undefined && typeof expandedPaths[path] !== 'undefined') {
      return expandedPaths[path];
    }
    return false;
  }

  setExpanded(path, expanded){
    const expandedPaths = this.state.expandedPaths;
    expandedPaths[path] = expanded;
    this.setState({expandedPaths: expandedPaths});
  }

  handleClick() {
    // console.log(this.props.data);
    const isExpandable = getIsExpandable(this.props.showNonenumerable);
    if (isExpandable(this.props.data)) {
      if (this.props.depth > 0) {
        this.props.setExpanded(this.props.path, !this.props.getExpanded(this.props.path));
      }
      else{
        this.setExpanded(this.props.path, !this.getExpanded(this.props.path));
      }
    }
  }

  render() {
    const { data, name } = this.props;

    const {showNonenumerable, isNonenumerable } = this.props;
    const isExpandable = getIsExpandable(this.props.showNonenumerable);

    const { depth, path } = this.props;

    const setExpanded = (depth === 0) ? (this.setExpanded.bind(this)) : this.props.setExpanded;
    const getExpanded = (depth === 0) ? (this.getExpanded.bind(this)) : this.props.getExpanded;

    const expanded = getExpanded(path);
    let expandGlyph;

    if(isExpandable(data)){
      expandGlyph = <span className={classnames('arrow', {expanded})}></span>;
    }

    // if current node is expanded render the property nodes
    let propertyNodesBox;
    if(expanded){
      let propertyNodes = [];

      Object.getOwnPropertyNames(data).forEach(propertyName => {
        // enumerables
        if(data.propertyIsEnumerable(propertyName)){

          const propertyValue = data[propertyName];
          propertyNodes.push(
            <ObjectInspector getExpanded={getExpanded}
              setExpanded={setExpanded}
              path={`${path}.${propertyName}`} // TODO: escape '.' in propertyName
              depth={depth + 1}
              key={propertyName}
              name={propertyName}
              data={propertyValue}
              showNonenumerable={showNonenumerable}
            />
          );

        // non enumerables, only show if showNonenumerable is enabled
        } else if(showNonenumerable){

          let propertyValue;
          // To work around the error (happens some time when propertyName === 'caller' || propertyName === 'arguments')
          // 'caller' and 'arguments' are restricted function properties and cannot be accessed in this context
          try{
            propertyValue = data[propertyName];
          } catch(e){
          }

          if(propertyValue !== undefined) {
            propertyNodes.push(
              <ObjectInspector getExpanded={getExpanded}
                setExpanded={setExpanded}
                path={`${path}.${propertyName}`} // TODO: escape '.' in propertyName
                depth={depth + 1}
                key={propertyName}
                name={propertyName}
                data={propertyValue}
                showNonenumerable={showNonenumerable}
                isNonenumerable
              />
            );
          }
        }
      });

      if(showNonenumerable && data !== Object.prototype){
        propertyNodes.push(
          <ObjectInspector getExpanded={getExpanded}
            setExpanded={setExpanded}
            path={`${path}.__proto__`} // TODO: escape '.' in propertyName
            depth={depth + 1}
            key="__proto__"
            name="__proto__"
            data={Object.getPrototypeOf(data)}
            showNonenumerable={showNonenumerable}
            isNonenumerable
          />
        );
      }

      propertyNodesBox = <div className="js-property-nodes">{propertyNodes}</div>;
    }

    return (
      <div className="object-inspector">
        <span className="object-property" onClick={this.handleClick.bind(this)}>
          {expandGlyph}
          <ObjectPreview object={data} name={name} isNonenumerable={isNonenumerable} />
        </span>
        {propertyNodesBox}
      </div>
    );
  }
}


export class ObjectDescription extends React.Component {

  static propTypes = {
    object: React.PropTypes.any
  };

  render() {
    const { object } = this.props;
    switch (typeof object) {
      case 'number':
        return <span className="js-value-number">{object}</span>;
      case 'string':
        return <span className="js-value-string">&quot;{object}&quot;</span>;
      case 'boolean':
        return <span className="js-value-boolean">{String(object)}</span>;
      case 'undefined':
        return <span className="js-value-undefined">undefined</span>;
      case 'object':
        if(object === null){
          return <span className="js-value-null">null</span>;
        }
        if(object instanceof Date){
          return <span>{object.toString()}</span>;
        }
        if(object instanceof RegExp){
          return <span className="js-value-regexp">{object.toString()}</span>;
        }
        if(Array.isArray(object)){
          return <span>{`Array[${object.length}]`}</span>;
        }
        return <span>{object.constructor.name}</span>;
      case 'function':
        return <span>
                  <span className="js-value-function-keyword">function</span>
                  <span className="js-value-function-name">&nbsp;{object.name}()</span>
                </span>;
      case 'symbol':
        return <span className="js-value-symbol">Symbol()</span>;
      default:
        return <span></span>;
    }
  }
}

export class ObjectPreview extends React.Component {

  static propTypes = {
    maxProperties: React.PropTypes.number,
    isNonenumerable: React.PropTypes.bool,
    object: React.PropTypes.any,
    name: React.PropTypes.string
  };

  static defaultProps = {
    maxProperties: 5, // max number of properties shown in the property view
    isNonenumerable: false,
  };

  //= ({ maxProperties, object, name, isNonenumerable }) => {
  render() {
    const { maxProperties, object, name, isNonenumerable } = this.props;

    if (typeof name !== 'undefined') {
      const Colon = () => <span>: </span>;
      return (
        <span>
          <span className={classnames('js-object-name', {'non-numberable': isNonenumerable})}>
            {name}
          </span>
          <Colon />
          <ObjectDescription object={object} />
        </span>
      );
    }

    if (typeof object !== 'object' || object === null || object instanceof Date || object instanceof RegExp) {
      return <ObjectDescription object={object} />;
    }

    if (Array.isArray(object)) {
      return (
        <span className="js-object-preview">
          [{intersperse(object.map((element, index) => <ObjectDescription key={index} object={element} />), ', ')}]
        </span>
      );

    } else {

      let propertyNodes = [];
      for (let propertyName in object){
        const propertyValue = object[propertyName];

        if (object.hasOwnProperty(propertyName)){
          let ellipsis;

          if (propertyNodes.length === (maxProperties - 1) && Object.keys(object).length > maxProperties) {
            ellipsis = <span key={'ellipsis'}>…</span>;
          }

          propertyNodes.push(
            <span key={propertyName}>
              <span className="js-object-name">{propertyName}</span>
              :&nbsp;
              <ObjectDescription object={propertyValue} />
              {ellipsis}
            </span>
          );
          if(ellipsis)
            break;
        }
      }

      return (
        <span className="js-object-preview">
          {'Object {'}
          {intersperse(propertyNodes, ', ')}
          {'}'}
        </span>
      );
    }
  }
};