import { Container } from "./styles"

import { Button } from "../../components/Button/Index"

export function Details() {
  return(
    <Container>
      <h1>Hello World!</h1>
      <span>Leonardo Reitz</span>

      <Button title= "Login" loading/>
      <Button title= "Cadastrar"/>
      <Button title="Voltar"/>
    </Container>
  )
}