import {
  combine,
  CombineState,
  createEffect,
  createEvent,
  createStore,
  Effect,
  Event,
  sample,
  Store,
  Unit,
} from 'effector';
import {every} from 'patronum';

export interface FieldValidate<Value, Error> {
  fn: (value: Value) => Error | null;
  on?: Array<Event<any>>;
}

export interface FieldOptions<Value, Error> {
  name: string;
  defaultValue: Value;
  validate?: FieldValidate<Value, Error>;
  resetOn?: Array<Event<any>>;
}

export interface Field<Value, Error> {
  name: string;
  $value: Store<Value>;
  $error: Store<Error | null>;
  changed: Event<Value>;
}

export function createField<Value, Error>(
  options: FieldOptions<Value, Error>,
): Field<Value, Error> {
  const $value = createStore(options.defaultValue, {
    name: options.name ? `${options.name} field value` : undefined,
  });

  const $error = createStore<Error | null>(null, {
    name: options.name ? `${options.name} field error` : undefined,
  });

  const changed = createEvent<Value>(options.name ? `${options.name} field changed` : undefined);

  $value.on(changed, (_, value) => value);

  if (options.validate) {
    sample({
      clock: options.validate.on as Array<Event<any>>,
      source: $value,
      fn: options.validate.fn,
      target: $error,
    });
  }

  if (options.resetOn) {
    $value.reset(options.resetOn as Array<Event<any>>);
    $error.reset(options.resetOn as Array<Event<any>>);
  }

  return {
    name: options.name,
    $value,
    $error,
    changed,
  };
}

export type FormFields<Dto> = {
  [name: string]: Field<any, any>;
};

export interface FormOptions<Dto, Error> {
  fields: {
    [name: string]: FieldOptions<any, any>;
  };
  defaultValidate?: {
    fn?: (value: any) => any | null;
    on?: Array<Event<any>>;
  };
  errorOn: Unit<Error>[];
  defaultResetOn?: Array<Event<any>>;
  dataMapFn: (idToEdit: Store<number>, fields: FormFields<Dto>) => CombineState<Partial<Dto>>;
  setFieldsValuesFn: (dto: Dto, fields: FormFields<Dto>) => void;
}

export interface Form<Dto, Error> {
  $data: Store<{[key: string]: any}>;
  $error: Store<string | null>;
  $isValid: Store<boolean>;
  $idToEdit: Store<number>;
  init: Event<number | null>;
  fields: FormFields<Dto>;
  canceled: Event<void>;
  submitted: Event<void>;
  setFieldsValuesFx: Effect<Dto, any, any>;
}

export function createForm<Dto, Error extends {message: string}>(
  options: FormOptions<Dto, Error>,
): Form<Dto, Error> {
  const {fields, dataMapFn, errorOn, defaultResetOn, defaultValidate, setFieldsValuesFn} = options;

  const canceled = createEvent();

  const submitted = createEvent();

  const init = createEvent<number | null>();

  const $idToEdit = createStore<number>(-1);

  $idToEdit.on(init, (_, id) => (Number(id) > 0 ? Number(id) : -1));

  const formFields = Object.entries(fields).reduce((previousValue, currentValue) => {
    const field = currentValue[1];

    let resetOn: Array<Event<any>> | undefined = field.resetOn;

    if (!resetOn) {
      resetOn = [];
    }

    resetOn.push(init);

    if (defaultResetOn) {
      resetOn.push(...(defaultResetOn as Array<Event<any>>));
    }

    const validate: FieldValidate<any, any> | undefined = field.validate ?? undefined;

    if (validate) {
      if (defaultValidate?.on) {
        validate.on = [submitted, ...(validate.on ?? []), ...defaultValidate.on];
      }
    }

    previousValue[currentValue[0]] = createField({
      name: field.name,
      defaultValue: field.defaultValue,
      resetOn: resetOn,
      validate: validate,
    });

    return previousValue;
  }, {} as FormFields<Dto>);

  const $error = createStore<string | null>(null);
  if (errorOn) {
    $error.on(errorOn, (_, error) => error.message);
  } else {
    console.warn('errorOn is undefined. error store will not be updated');
  }
  $error.reset(init, submitted);

  const $data = combine<{[key: string]: any}>(
    Object.entries(formFields).reduce((previousValue, currentValue) => {
      previousValue[currentValue[1].name ?? currentValue[0]] = currentValue[1].$value;
      return previousValue;
    }, {id: $idToEdit} as {[key: string]: any}),
  );

  const $isValid = every({
    stores: Object.values(formFields).map((field) => field.$error),
    predicate: null,
  });

  const setFieldsValuesFx = createEffect<Dto, void, void>((dto) => {
    setFieldsValuesFn(dto, formFields);
  });

  return {
    $data,
    $error,
    $isValid,
    $idToEdit,
    init,
    fields: formFields,
    canceled,
    submitted,
    setFieldsValuesFx,
  };
}
