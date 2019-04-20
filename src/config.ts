import { assign, getPath } from "./utils";
import { InteractionModeFactory } from "./modes";
import { RootI18nDictionary } from "./core/i18n";

type ValidationClass = string | string[] | undefined;

export interface ValidationClassMap {
  touched?: ValidationClass;
  untouched?: ValidationClass;
  valid?: ValidationClass;
  invalid?: ValidationClass;
  pristine?: ValidationClass;
  dirty?: ValidationClass;
  [k: string]: ValidationClass;
}

export interface VeeValidateConfig {
  locale: string;
  classes: boolean;
  bails: boolean;
  aria: boolean;
  validity: boolean;
  useConstraintAttrs: boolean;
  mode: string | InteractionModeFactory;
  classNames: ValidationClassMap;
  dictionary: RootI18nDictionary;
  delay: number;
}

const DEFAULT_CONFIG: Partial<VeeValidateConfig> = {
  locale: "en",
  classes: false,
  classNames: {
    touched: "touched", // the control has been blurred
    untouched: "untouched", // the control hasn't been blurred
    valid: "valid", // model is valid
    invalid: "invalid", // model is invalid
    pristine: "pristine", // control has not been interacted with
    dirty: "dirty" // control has been interacted with
  },
  bails: true,
  aria: true,
  validity: false,
  mode: "aggressive",
  useConstraintAttrs: true,
  dictionary: undefined,
  delay: 0
};

export let currentConfig: VeeValidateConfig = assign({}, DEFAULT_CONFIG);

export const resolveConfig = (ctx: any) => {
  const selfConfig = getPath("$options.$_veeValidate", ctx, {});

  return assign({}, currentConfig, selfConfig);
};

export const getConfig = () => currentConfig;

export const setConfig = (newConf: Partial<VeeValidateConfig>) => {
  currentConfig = assign({}, currentConfig, newConf);
};
