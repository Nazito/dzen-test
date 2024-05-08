import { IProduct } from '@/types/interfaces';

export const getEntitysByIds = (
  entitysIds: string[] = [],
  options: { label: string; value: string }[] | IProduct[],
) => {
  const filterBy = (opt: { label: string; value: string } | IProduct) => {
    if ('value' in opt) {
      return entitysIds.includes(String(opt.value));
    }
    if ('id' in opt) {
      return entitysIds.includes(String(opt.id));
    }

    return false;
  };
  return options.filter(filterBy);
};
