declare type ResponseWrap<Type> = {
    error: boolean,
    data: Type | null,
    message: string
}