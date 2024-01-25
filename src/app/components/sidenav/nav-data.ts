import { UserLoginDTO } from './../login/DTO/userDTO';
import { PrimeIcons } from "primeng/api"

export const navDataBar = [
    {
        routerLink:'inicio',
        icon: PrimeIcons.HOME,
        label:"INÍCIO",
        tooltip:"Início"
    },
    {
        routerLink:'clientes',
        icon: PrimeIcons.USERS,
        label:"CLIENTES",
        tooltip:"Clientes"
    },
    {
        routerLink:'atendimento',
        icon: PrimeIcons.CAR,
        label:"ATENDIMENTOS",
        tooltip:"Atendimentos"
    },  
    {
        routerLink:'financeiro',
        icon:PrimeIcons.MONEY_BILL,
        label:"FINANCEIRO",
        tooltip:"Financeiro"
    },
    {
        routerLink:'gestao',
        icon: PrimeIcons.BRIEFCASE,
        label:"ADMINISTRAÇÃO",
        tooltip:"Gestão"
    },
]