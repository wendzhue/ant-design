import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { isPresetColor } from './util';

export interface CheckableTagProps {
  prefixCls?: string;
  className?: string;
  checked: boolean;
  color?: string;
  unCheckedColor?: string;
  onChange?: (checked: boolean) => void;
  style?: React.CSSProperties;
}

export default class CheckableTag extends React.Component<CheckableTagProps> {
  handleClick = () => {
    const { checked, onChange } = this.props;
    if (onChange) {
      onChange(!checked);
    }
  };

  renderCheckableTag = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, checked, color, ...restProps } = this.props;
    const prefixCls = getPrefixCls('tag', customizePrefixCls);
    const isPreset = isPresetColor(color);
    const cls = classNames(
      prefixCls,
      {
        [`${prefixCls}-checkable`]: true,
        [`${prefixCls}-checkable-checked`]: checked,
        [`${prefixCls}-has-color`]: !!color && !isPreset,
        [`${prefixCls}-${color}`]: color && isPreset ? !!color : false,
      },
      className,
    );

    Reflect.deleteProperty(restProps, 'onChange');
    Reflect.deleteProperty(restProps, 'unCheckedColor');

    return (
      <div
        {...restProps as any}
        style={this.getTagStyle()}
        className={cls}
        onClick={this.handleClick}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCheckableTag}</ConfigConsumer>;
  }

  getTagStyle() {
    const { color, unCheckedColor, style, checked } = this.props;
    const isPreset = isPresetColor(color);
    return {
      color: !isPreset && !checked ? color : undefined,
      backgroundColor:
        color && !isPreset ? (checked ? color : unCheckedColor) : undefined,
      ...style,
    };
  }
}
