import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import intersperse from '../utils/intersperse';
import bunyanFormatter from '../utils/bunyan-formatter';
import ObjectInspector from './ObjectInspector';

export default class Record extends React.Component {
  static propTypes = {
    format: React.PropTypes.string,
    record: React.PropTypes.object,
    onTagClick: React.PropTypes.func
  };

  static defaultProps = {
    onTagClick: e => e
  }

  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }

  handleExpandClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleTagClick(tag, e) {
    e.preventDefault();
    this.props.onTagClick(tag, e);
  }

  render() {
    const {expanded} = this.state;
    const {format, record} = this.props;
    const {log, object, error, tags} = bunyanFormatter(format, record);
    let inspectObject = null;
    let tagArray = null;

    if (error) {
      inspectObject = <pre className="expandable">{error}</pre>;
    } else if (object) {
      inspectObject = <ObjectInspector data={object} />;
    }

    if (tags) {
      tagArray = intersperse(_.map(tags, (value, key) => (
        <a
          key={key}
          href="#"
          onClick={this.handleTagClick.bind(this, `${key}: ${value}`)}
        >
          {key}:&nbsp;{value}
        </a>
      )), ', ');
    }

    return <div className={classnames('record', {error, expanded})}>
      <div className="details">
        <div
          className="text"
          onClick={this.handleExpandClick.bind(this)}
          dangerouslySetInnerHTML={{__html: log }}
        />
        <div className="tags">
          {tagArray}
        </div>
      </div>
      {inspectObject}
    </div>;
  }
}