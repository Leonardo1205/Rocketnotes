import { FiPlus, FiSearch } from "react-icons/fi";
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles"
import { Note } from "../../components/Note";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";
import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function Home() {
    const [tags, setTags] = useState([]);
    const [tagSelected, setTagSelected] = useState([]);

    function handleTagSelected(tagName) {
        const alreadySelected = tagSelected.includes(tagName);

        if (alreadySelected) {
            const filteredTags = tagSelected.filter(tag => tag !== tagName);
            setTagSelected(filteredTags);
        } else {
            setTagSelected(prevState => [...prevState, tagName]);
        }
     }

    useEffect(() => {
        async function feachTags() {
            const response = await api.get("/tags");

            setTags(response.data);
        }

        feachTags();
    }, [])

    return(
        <Container>
            
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header/>

            <Menu>
                <li>
                    <ButtonText 
                        title= "Todos" 
                        onClick={() => handleTagSelected("all")}
                        isActive={tagSelected.length === 0}
                    />
                </li>
                {
                    tags && tags.map(tag =>(
                        <li key={String(tag.id)}>
                            <ButtonText 
                                title= {tag.name} 
                                onClick={() => handleTagSelected(tag.name)}
                                isActive={tagSelected.includes(tag.name)}
                            />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input placeholder= "Pesquisar pelo título" icon={FiSearch}/>
            </Search>

            <Content>
                <Section title= "Minhas notas">
                    <Note data={{
                        title: 'React',
                        tags: [
                            {id: "1", name: 'react'},
                            {id: "2", name: 'rocketnotes'}
                        ]
                    }}/>

                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus/>
                Criar Nota
            </NewNote>

        </Container>
    );
}