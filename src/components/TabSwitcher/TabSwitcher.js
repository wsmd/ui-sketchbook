import React, { Component, createRef } from 'react';
import classNames from 'classnames';
import './TabSwitcher.css';

class TabSwitcher extends Component {
  containerRef = createRef();

  indicatorRef = createRef();

  activeItemRef = createRef();

  state = { activeItem: 0 };

  componentDidMount() {
    this.updateIndicatorPosition();
  }

  componentDidUpdate(prevState) {
    if (prevState.activeItem !== this.state.activeItem) {
      this.updateIndicatorPosition();
    }
  }

  handleItemClick = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ activeItem: Number(e.target.dataset.tabIndex) });
  };

  updateIndicatorPosition() {
    const { current: activeItem } = this.activeItemRef;
    const { current: container } = this.containerRef;
    const { current: indicator } = this.indicatorRef;
    const menuRect = container.getBoundingClientRect();
    const activeItemRect = activeItem.getBoundingClientRect();
    const x = Math.round(activeItemRect.left - menuRect.left);
    indicator.style.width = `${activeItemRect.width}px`;
    indicator.style.transform = `translateX(${x}px)`;
  }

  render() {
    const { items } = this.props;
    const { activeItem } = this.state;
    return (
      <div className="TabSwitcher" ref={this.containerRef}>
        <ul className="TabSwitcher-items">
          {items.map((item, i) => (
            <li
              key={item.label}
              className={classNames('TabSwitcher-item', {
                'is-active': activeItem === i
              })}
              ref={activeItem === i ? this.activeItemRef : null}
            >
              <a
                href={item.href}
                data-tab-index={i}
                onClick={this.handleItemClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="TabSwitcher-indicator" ref={this.indicatorRef} />
      </div>
    );
  }
}

export default TabSwitcher;
