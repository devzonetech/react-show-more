import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Truncate from './Truncate';

class ShowMoreText extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            truncated: false
        };
    }

    static defaultProps = {
        lines: 3,
        more: 'Show more',
        less: 'Show less',
        anchorClass: '',
        onClick: undefined,
        expanded: false,
        width: 0,
        keepNewLines: false
    };

    static propTypes = {
        children: PropTypes.node,
        lines: PropTypes.number,
        more: PropTypes.node,
        less: PropTypes.node,
        anchorClass: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        expanded: PropTypes.bool,
        width: PropTypes.number,
        keepNewLines: PropTypes.bool
    };

    componentDidMount() {
        this._isMounted = true;

        var _self = this;
        if (this._isMounted) {
            this.setState({
                expanded: _self.props.expanded
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleTruncate = truncated => {
        if (this._isMounted && truncated !== this.state.truncated) {
            this.setState({
                truncated
            });
            if (truncated) { this.truncateRef.onResize(); }
        }
    };

    toggleLines = event => {
        event.preventDefault();
        var _self = this;
        if (this._isMounted) {
            this.setState(
                {
                    expanded: !this.state.expanded
                },
                () => {
                    if (_self.props.onClick) {
                        _self.props.onClick(_self.state.expanded);
                    }
                }
            );
        }
    };

    render() {
        const {
            children,
            more,
            less,
            lines,
            anchorClass,
            className,
            width,
            keepNewLines
        } = this.props;

        const { truncated } = this.state;

        const expanded =
          typeof this.props.expanded === 'boolean'
            ? this.props.expanded
            : this.state.expanded;

        return (
            <div className={className}>
                <Truncate
                    width={width}
                    lines={!expanded && lines}
                    ellipsis={
                        <span>
                            ...{' '}
                            <a
                                href=''
                                className={anchorClass}
                                onClick={this.toggleLines}
                            >
                                {more}
                            </a>
                        </span>
                    }
                    onTruncate={this.handleTruncate}
                    ref={ref => (this.truncateRef = ref)}
                >
                    {keepNewLines ?
                        children.split('\n').map((line, i, arr) => {
                            line = <span key={i}>{line}</span>;

                            if (i === arr.length - 1) {
                                return line;
                            } else {
                                return [line, <br key={i + 'br'} />];
                            }
                        }
                        )
                        : children
                    }
                </Truncate>
                {!truncated && expanded && (
                    <span>
                        {' '}
                        <a
                            href=''
                            className={anchorClass}
                            onClick={this.toggleLines}
                        >
                            {less}
                        </a>
                    </span>
                )}
            </div>
        );
    }
}

export default ShowMoreText;
