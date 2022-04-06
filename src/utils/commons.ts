import { FormGroup } from "@angular/forms";

export const sortCompare = (a: string | number, b: string | number) =>
  a < b ? -1 : a > b ? 1 : 0;

export const atLeastOneHasValue = (fields: Array<string>) => {
  return (group: FormGroup) => {
    for (const fieldName of fields) {
      if (group.get(fieldName)?.value) {
        return null;
      }
    }
    return { paymentMethodRequired: true };
  };
};
