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
        icon: PrimeIcons.CAR,
        label:"CLIENTES"
    },
    {
        routerLink:'atendimento',
        icon: PrimeIcons.USERS,
        label:"ATENDIMENTOS"
    },
    {
        routerLink:'financeiro',
        icon:PrimeIcons.BRIEFCASE,
        label:"FINANCEIRO"
    }
]