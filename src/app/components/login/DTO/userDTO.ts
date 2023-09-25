export interface UserRegisterDTO{
    nm_usuario: string,
    senha:      string,
    email:      string
}

export interface UserLoginDTO{
    email: string,
    senha: string
}