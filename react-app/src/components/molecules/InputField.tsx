import { Input } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import clsx from 'clsx';
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  FocusEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  useId,
  useMemo,
} from 'react';
import { Form } from 'react-bootstrap';
import { Control, Path, useController } from 'react-hook-form';

type IProps<IForm extends object> = {
  readonly name: Path<IForm>;
  readonly addonAfter?: ReactNode;
  readonly addonBefore?: ReactNode;
  readonly allowClear?: boolean;
  readonly autoComplete?: boolean;
  readonly autofocus?: boolean;
  readonly className?: string;
  readonly control?: Control<IForm, object>;
  readonly disabled?: boolean;
  readonly errorClass?: string;
  readonly groupClass?: string;
  readonly hint?: ReactNode;
  readonly hintClass?: string;
  readonly id?: string;
  readonly label?: ReactNode;
  readonly labelClass?: string;
  readonly maxLength?: number;
  readonly onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onClick?: MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onInput?: FormEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly onPressEnter?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  readonly pattern?: string;
  readonly placeholder?: string;
  readonly readOnly?: boolean;
  readonly required?: boolean;
  readonly showCount?: boolean;
  readonly size?: SizeType;
  readonly suffix?: ReactNode;
  readonly value?: string | number | string[] | undefined;
} & (
  | {
      readonly type: 'textarea';
      readonly autoSize?: boolean;
      readonly onResize?: (dimension: { height: number; width: number }) => void;
      readonly prefix?: string;
    }
);

const InputField = <IForm extends object>(props: IProps<IForm>) => {
  const controlId = useId();
  const { field, formState } = props.control
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useController({ control: props.control, name: props.name })
    : { field: undefined, formState: undefined };
  const errorMessage = (formState?.errors[props.name]?.message as string) || '';

  const value = useMemo(
    () => ((field?.value) ? field?.value : props.value || ''),
    [field?.value, props.value]
  );

  const inputProps = {
    ...field,
    addonAfter: props.addonAfter,
    addonBefore: props.addonBefore,
    autoComplete: props.autoComplete ? 'on' : 'off',
    autoFocus: props.autofocus,
    className: clsx(!!errorMessage && 'is-invalid', props.className),
    disabled: props.disabled,
    id: props.id,
    maxLength: props.maxLength,
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      field?.onBlur();
      props.onBlur?.(e);
    },
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      field?.onChange(e);
      props.onChange?.(e);
    },
    onClick: props.onClick,
    onFocus: props.onFocus,
    onInput: props.onInput,
    onPressEnter: props.onPressEnter,
    pattern: props.pattern,
    placeholder: props.placeholder,
    readOnly: props.readOnly,
    showCount: props.showCount,
    size: props.size,
    suffix: props.suffix,
    type: props.type,
    value,
  };

  return (
    <Form.Group className={clsx(props.groupClass)} controlId={controlId}>
      <Form.Label
        className={clsx(!props.label && 'd-none', props.required && 'required', props.labelClass)}
      >
        {props.label}
      </Form.Label>

      {(() => {
        switch (props.type) {
          case 'textarea':
            return (
              <Input.TextArea
                {...inputProps}
                autoSize={props.autoSize}
                onResize={props.onResize}
                prefix={props.prefix}
                status={errorMessage ? 'error' : ''}
              />
            );
          default:
            return (
              <Input
                {...inputProps}
                allowClear={props.allowClear}
                prefix={props.prefix}
                status={errorMessage ? 'error' : ''}
              />
            );
        }
      })()}

      <Form.Text className={clsx('text-red-500', props.hintClass)}>{errorMessage}</Form.Text>
    </Form.Group>
  );
};

InputField.defaultProps = {
  allowClear: true,
  autoComplete: true,
  size: 'large',
  type: 'text',
  visibilityToggle: true,
};

export { InputField };
