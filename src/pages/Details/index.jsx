import { Container, Links, Content } from "./styles"

import { Header } from "../../components/Header"
import { Button } from "../../components/Button/Index"
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tag"
import { ButtonText } from "../../components/ButtonText"

export function Details() {

  return(
    <Container>
      <Header />

      <main>
        <Content>
          <ButtonText title="Excluir nota"/>

            <h1>
              Indrodução ao React
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, nostrum. Veritatis iste quo sed labore, adipisci dicta temporibus ea ipsum doloremque consequuntur. Et harum commodi distinctio inventore autem neque expedita.
            </p>
            <Section title= "Links úteis">
              <Links>
                <li><a href="#">https://www.rocketseat.com.br</a></li>
                <li><a href="#">https://www.rocketseat.com.br</a></li>
              </Links>
            </Section>

            <Section title= "Marcadores">
              <Tag title= "express"/>
              <Tag title= "nodejs"/>
            </Section>
          <Button title="Voltar"/>
        </Content>
      </main>
    </Container>
  )
}