import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react';

import classNames from 'util/classNames';

import styles from './DropDownInput.module.scss';
import dropdownImg from './assets/icon-dropdown.svg';

export const DEFAULT_BORDER_COLOR = '#cdcdcf';
export const DEFAULT_BORDER_WIDTH = 1;
export const DEFAULT_BORDER_RADIUS = 4;
export const DEFAULT_BORDER_STYLE = 'solid';
export const DEFAULT_HORIZONTAL_PADDING = 12;
export const DEFAULT_VERTICAL_PADDING = 8;

export type DropDownInputOption = {
  id: string;
  content: ReactNode;
};

export type DropDownInputProps = {
  borderColor?: string;
  borderWidth?: number | string;
  borderRadius?: number | string;
  borderStyle?:
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inset'
    | 'none'
    | 'outset'
    | 'ridge'
    | 'solid';
  dropDownClassName?: string;
  dropDownStyle?: React.CSSProperties;
  excludeSelectedOption?: boolean;
  fluid?: boolean;
  options?: DropDownInputOption[];
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  placeholder?: ReactNode;
  selectedOptionClassName?: string;
  selectedOptionId?: string;
  toggleIcon?: React.ReactNode;
  onOptionSelected: (id: string) => void;
} & React.ComponentProps<'div'>;

const DropDownInput = ({
  'aria-labelledby': ariaLabelledBy,
  borderColor = DEFAULT_BORDER_COLOR,
  borderWidth = DEFAULT_BORDER_WIDTH,
  borderRadius = DEFAULT_BORDER_RADIUS,
  borderStyle = DEFAULT_BORDER_STYLE,
  className,
  dropDownClassName,
  dropDownStyle,
  excludeSelectedOption = false,
  fluid = false,
  options = [],
  padding,
  paddingHorizontal,
  paddingVertical,
  placeholder = '\u00a0',
  selectedOptionClassName,
  selectedOptionId,
  toggleIcon,
  onOptionSelected,
  ...rest
}: DropDownInputProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const valueRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const selectedOptionRef = useRef<HTMLLIElement>(null);

  // Focus the list once expanded to allow for keyboard interaction
  useLayoutEffect(() => {
    if (isExpanded && listRef.current) {
      listRef.current.focus();
    }
  }, [isExpanded]);

  // If the list is scrollable, ensure selected option is visible
  useLayoutEffect(() => {
    if (!listRef.current || !selectedOptionRef.current) {
      return;
    }

    const list = listRef.current;
    const option = selectedOptionRef.current;

    if (list.scrollHeight <= list.clientHeight) {
      return;
    }

    if (option.offsetTop < list.scrollTop) {
      list.scrollTop = option.offsetTop;
    } else if (
      option.offsetTop + option.clientHeight >
      list.scrollTop + list.clientHeight
    ) {
      list.scrollTop =
        option.offsetTop - list.clientHeight + option.clientHeight;
    }
  }, [selectedOptionId]);

  const onToggle = () => {
    setIsExpanded((isCurrentlyExpanded) => !isCurrentlyExpanded);
  };

  const onSelect = (id: string) => {
    setIsExpanded(false);
    onOptionSelected(id);
  };

  const onListBlur = () => {
    setIsExpanded(false);
  };

  // Keyboard event handler for the value element - used to expand/collapse
  const onValueKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    switch (evt.key) {
      case ' ':
      case 'Space':
      case 'Enter': {
        onToggle();
        break;
      }
      case 'Esc':
      case 'Escape': {
        setIsExpanded(false);
        break;
      }
      case 'ArrowDown': {
        if (!isExpanded) {
          setIsExpanded(true);
        }
        break;
      }
      case 'ArrowUp': {
        if (!isExpanded) {
          setIsExpanded(true);
        }
        break;
      }
      default: {
        // No action
        break;
      }
    }
  };

  // Keyboard event handler for the list element - used to navigate/select/expand/collapse
  const onListKeyDown = (evt: React.KeyboardEvent<HTMLUListElement>) => {
    // No options, nothing to do
    if (options.length === 0) {
      return;
    }

    switch (evt.key) {
      case ' ':
      case 'Space':
      case 'Enter': {
        onToggle();

        if (valueRef.current) {
          valueRef.current.focus();
        }
        break;
      }
      case 'Esc':
      case 'Escape': {
        setIsExpanded(false);

        if (valueRef.current) {
          valueRef.current.focus();
        }
        break;
      }
      case 'ArrowDown': {
        if (!isExpanded) {
          setIsExpanded(true);
          break;
        }

        const currentIndex = options.findIndex(
          (option) => option.id === selectedOptionId,
        );

        // Select the next option or loop to start
        const nextIndex =
          currentIndex === options.length - 1 || currentIndex == -1
            ? 0
            : currentIndex + 1;
        onOptionSelected(options[nextIndex].id);
        evt.preventDefault();
        break;
      }
      case 'ArrowUp': {
        if (!isExpanded) {
          setIsExpanded(true);
          break;
        }

        // Select previous option or loop to end
        const currentIndex = options.findIndex(
          (option) => option.id === selectedOptionId,
        );
        const nextIndex =
          currentIndex === 0 || currentIndex === -1
            ? options.length - 1
            : currentIndex - 1;
        onOptionSelected(options[nextIndex].id);
        evt.preventDefault();
        break;
      }
      case 'Home': {
        onOptionSelected(options[0].id);
        evt.preventDefault();
        break;
      }
      case 'End': {
        onOptionSelected(options[options.length - 1].id);
        evt.preventDefault();
        break;
      }
      default: {
        // No action
        break;
      }
    }
  };

  const selectedOption =
    selectedOptionId !== undefined
      ? options.find((option) => option.id === selectedOptionId)
      : null;
  const displayedOptions =
    excludeSelectedOption && selectedOptionId !== undefined
      ? options.filter((option) => option.id !== selectedOptionId)
      : options;

  const activeSelectedOptionClassName =
    selectedOptionClassName ?? styles.selected;

  let activeHorizontalPadding = DEFAULT_HORIZONTAL_PADDING;
  let activeVerticalPadding = DEFAULT_VERTICAL_PADDING;

  if (padding !== undefined) {
    activeHorizontalPadding = padding;
    activeVerticalPadding = padding;
  }

  if (paddingHorizontal !== undefined) {
    activeHorizontalPadding = paddingHorizontal;
  }

  if (paddingVertical !== undefined) {
    activeVerticalPadding = paddingVertical;
  }

  return (
    <div
      className={classNames(styles.drop_down_input, className, {
        [styles.expanded]: isExpanded,
        [styles.fluid]: fluid,
      })}
      {...rest}
    >
      <div
        aria-expanded={isExpanded}
        aria-haspopup="listbox"
        aria-labelledby={ariaLabelledBy}
        className={styles.active_option}
        ref={valueRef}
        role="button"
        style={{
          borderColor,
          borderWidth,
          borderRadius,
          borderBottomLeftRadius: isExpanded ? 0 : borderRadius,
          borderBottomRightRadius: isExpanded ? 0 : borderRadius,
          borderStyle,
          borderBottomColor: isExpanded ? 'transparent' : borderColor,
          paddingLeft: activeHorizontalPadding,
          paddingTop: activeVerticalPadding,
          paddingBottom: activeVerticalPadding,
        }}
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={onValueKeyDown}
      >
        {selectedOption ? selectedOption.content : placeholder}
        <div
          className={styles.dropdown_icon}
          style={{
            paddingLeft: activeHorizontalPadding,
            paddingRight: activeHorizontalPadding,
          }}
        >
          {toggleIcon ?? <img src={dropdownImg} alt="" />}
        </div>
      </div>
      <ul
        aria-labelledby={ariaLabelledBy}
        className={classNames(styles.dropdown, dropDownClassName)}
        role="listbox"
        ref={listRef}
        style={{
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
          borderColor: borderColor,
          borderWidth,
          borderStyle,
          borderTopStyle: fluid ? 'none' : borderStyle,
          ...dropDownStyle,
        }}
        tabIndex={-1}
        onBlur={onListBlur}
        onKeyDown={onListKeyDown}
      >
        {displayedOptions.map(({ id, content }) => (
          <li
            aria-selected={id === selectedOptionId}
            key={id}
            className={classNames(styles.option, {
              [activeSelectedOptionClassName]: id === selectedOptionId,
            })}
            role="option"
            ref={id === selectedOptionId ? selectedOptionRef : undefined}
            style={{
              paddingLeft: activeHorizontalPadding,
              paddingRight: activeHorizontalPadding,
              paddingTop: activeVerticalPadding,
              paddingBottom: activeVerticalPadding,
            }}
            onClick={() => onSelect(id)}
            onKeyPress={() => onSelect(id)}
          >
            {content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownInput;
