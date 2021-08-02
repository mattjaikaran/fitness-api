class TableData {
  id: number;
  name: string;
  path: string;
}
const TablesList: any = {
  USERS: new TableData(),
  ROLES: new TableData(),
  FILES: new TableData(),
  USER_ROLES: new TableData(),
  ROLE_HAS_PERMISSIONS: new TableData(),
  PERMISSIONS: new TableData(),
  USER_HAS_PERMISSIONS: new TableData(),
  TOKENS: new TableData(),

  LOCATIONS: new TableData(),
  FLOOR_PLANS: new TableData(),
  STYLES: new TableData(),
  BOXES: new TableData(),
  FEATURES: new TableData(),
  BOX_FEATURES: new TableData(),
  DAYS: new TableData(),
  TIMINGS: new TableData(),
  BOX_RATES: new TableData(),
  EXPERTISE: new TableData(),
  INSTRUCTOR_EXPERTISE: new TableData(),
  INSTRUCTORS: new TableData(),
  BOOKINGS: new TableData(),
};

const numHash = (t: string) =>
  [...t].map((v, i) => (i + 1) * v.charCodeAt(0)).reduce((a, b) => a + b);

const genTablesName: any = ({ p, s }) => {
  Object.keys(TablesList).forEach((v) => {
    TablesList[v].id = numHash(v);
    TablesList[v].name = p + v.toLowerCase() + s;
  });
  const ids = Object.values(TablesList).map((v: any) => v.id);
  if (ids.length !== new Set(ids).size) {
    throw new Error('Non Unique Id');
  }
  return TablesList;
};

export const TABLES = genTablesName({ p: '', s: '' });
