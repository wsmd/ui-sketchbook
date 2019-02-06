import React, { Component } from 'react';
import classNames from 'classnames';
import union from 'lodash.union';
import difference from 'lodash.difference';
import intersection from 'lodash.intersection';
import Item from './Item';

import './DragSelect.scss';

const initialSelectionStyle = [
  'width',
  'height',
  'top',
  'left',
  'initialLeft',
  'initialTop'
].reduce((obj, key) => ({ ...obj, [key]: undefined }), {});

class Selection extends Component {
  items = {};

  state = {
    isSelecting: false,
    stoppedSelecting: false,
    selection: initialSelectionStyle,
    selectedIds: [],
    items: Array.from({ length: 12 }, (v, i) => i)
  };

  handleMouseDown = e => {
    clearTimeout(this.mouseDownTimer);
    clearTimeout(this.selectionTimer);
    const { pageY, pageX } = e;
    this.mouseDownTimer = setTimeout(() => {
      this.setState({
        stoppedSelecting: false,
        selection: {
          ...initialSelectionStyle,
          top: pageY,
          left: pageX,
          initialLeft: pageX,
          initialTop: pageY
        }
      });
      window.addEventListener('mousemove', this.handleMouseMove);
    }, 100);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  handleMouseUp = () => {
    const { selection } = this.state;
    clearTimeout(this.mouseDownTimer);
    clearTimeout(this.selectionTimer);
    if (this.hasSelectedItems) {
      this.handleSelection(selection);
      this.hasSelectedItems = false;
    }
    this.setState({ stoppedSelecting: true });
    this.selectionTimer = setTimeout(() => {
      this.setState({
        isSelecting: false,
        stoppedSelecting: false,
        selection: initialSelectionStyle
      });
    }, 250);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  handleMouseMove = e => {
    const { selection } = this.state;
    const style = {};
    if (selection.initialLeft > e.clientX) {
      style.width = selection.initialLeft - e.clientX;
      style.left = selection.initialLeft - style.width;
    } else if (selection.initialLeft < e.clientX) {
      style.width = e.clientX - selection.initialLeft;
      style.left = selection.initialLeft;
    }

    if (selection.initialTop > e.pageY) {
      style.height = selection.initialTop - e.pageY;
      style.top = selection.initialTop - style.height;
    } else if (selection.initialTop < e.pageY) {
      style.height = e.pageY - selection.initialTop;
      style.top = selection.initialTop;
    }

    const { id } = e.target.dataset;
    if (!this.hasSelectedItems && e.target === this.items[id]) {
      this.hasSelectedItems = true;
    }

    this.setState(state => ({
      isSelecting: true,
      selection: { ...state.selection, ...style }
    }));
  };

  toggleItem = itemId => {
    this.setState(state => {
      const id = parseInt(itemId, 10);
      const selectedIds = new Set(state.selectedIds);
      if (selectedIds.has(id)) {
        selectedIds.delete(id);
      } else {
        selectedIds.add(id);
      }
      return {
        ...state,
        selectedIds: Array.from(selectedIds)
      };
    });
  };

  handleSelection() {
    const { selectedIds } = this.state;
    const selectionRect = this.selectionEl.getBoundingClientRect();
    const previousSelectionItems = new Set(selectedIds);
    const currentSelectionItems = new Set();

    Object.entries(this.items).forEach(([, item]) => {
      const id = parseInt(item.dataset.id, 10);
      const { left, top, right, bottom } = item.getBoundingClientRect();
      const includedInSelection = !(
        selectionRect.right < left ||
        selectionRect.left > right ||
        selectionRect.bottom < top ||
        selectionRect.top > bottom
      );
      if (includedInSelection) {
        currentSelectionItems.add(id);
      }
    });

    const previous = Array.from(previousSelectionItems);
    const current = Array.from(currentSelectionItems);
    const intersect = intersection(previous, current);

    if (previous.length && intersect.length === current.length) {
      this.setState({
        selectedIds: difference(previous, intersect)
      });
    } else if (!intersect.length && current.length) {
      this.setState({
        selectedIds: Array.from(new Set([...previous, ...current]))
      });
    } else if (union(current, intersect).length === current.length) {
      this.setState({
        selectedIds: Array.from(
          new Set(previous.concat(union(current, intersect)))
        )
      });
    }
  }

  render() {
    const {
      isSelecting,
      stoppedSelecting,
      selection,
      selectedIds,
      items
    } = this.state;
    const { layout } = this.props;
    return (
      <>
        {isSelecting && (
          <div
            style={selection}
            className={classNames('Selection', stoppedSelecting && 'fade-out')}
            ref={n => {
              this.selectionEl = n;
            }}
          />
        )}
        <div className="Header">
          <div className="ButtonGroup">
            <button
              type="button"
              className="Button"
              disabled={!selectedIds.length}
              onClick={() => this.setState({ selectedIds: [] })}
            >
              Deselect All
            </button>
            <button
              type="button"
              className="Button"
              onClick={() => this.setState({ selectedIds: items })}
            >
              Select All
            </button>
          </div>
        </div>
        <div
          role="region"
          className={classNames(
            'Wrapper',
            layout === 'grid' ? 'is-grid' : 'is-list'
          )}
          onMouseDown={this.handleMouseDown}
          ref={n => {
            this.container = n;
          }}
        >
          {items.map(item => (
            <Item
              data-id={item}
              // eslint-disable-next-line react/no-array-index-key
              key={item}
              selected={selectedIds.includes(item)}
              innerRef={n => {
                this.items[item] = n;
              }}
              onClick={() => this.toggleItem(item)}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Selection;
