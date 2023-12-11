import { UserLoginDTO } from './../login/DTO/userDTO';
import { PrimeIcons } from "primeng/api"

export const navDataBar = [
    {
        routerLink:'inicio',
        icon: PrimeIcons.HOME,
        label:"INÍCIO"
    },
    {
        routerLink:'clientes',
        icon: PrimeIcons.USERS,
        label:"CLIENTES"
    },
    {
        routerLink:'atendimento',
        icon: PrimeIcons.CAR,
        label:"ATENDIMENTOS"
    },  
    {
        routerLink:'financeiro',
        icon:PrimeIcons.MONEY_BILL,
        label:"FINANCEIRO"
    },
    {
        routerLink:'gestao',
        icon: PrimeIcons.BRIEFCASE,
        label:"ADMINISTRAÇÃO"
    },
]