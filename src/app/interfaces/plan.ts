export interface Plan {
  plan: string;
  nombre: string;
  periodos: [
    {
      periodo: number;
      valor: number;
    },
    {
      periodo: number;
      valor: number;
    },
    {
      periodo: number;
      valor: number;
    }
  ];
  agregadoCarrito: boolean;
  periodoActivo: number;
  idCarrito:number;
}
