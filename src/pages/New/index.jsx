import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button/Index"
import { Container, Form } from "./styles"



export function New() {
    return(
        <Container>
            <Header/>
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <a href="/">Voltar</a>
                    </header>

                    <Input placeholder="Título"/>
                    <Textarea placeholder="Observações"/>

                    <Section title= "Links úteis">
                        <NoteItem value="https://youtube.com.br"/>
                        <NoteItem isNew placeholder="Novo Link"/>
                    </Section>

                    <Section title= "Marcadores">
                            <NoteItem value="react"/>
                            <NoteItem isNew placeholder="Nova tag"/>  
                    </Section>

                    <Button title="Salvar"/>
                </Form>
            </main>
        </Container>
    )
}