export interface Client {

  id?: number;
  firstname: string;
  lastname: string;

}


export function createEmptyClient(): Client {
  return {
    firstname: "",
    lastname: ""
  };
}
