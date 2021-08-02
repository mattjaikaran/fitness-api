import { JOIN_HELPER } from './join-helper.const';

export const EntitiesRegister: any = {
  
};

export const Entities: any = Object.values(EntitiesRegister);
Object.entries(EntitiesRegister).forEach(([k, v]) => (JOIN_HELPER[k] = v));
