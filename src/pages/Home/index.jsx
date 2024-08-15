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
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const [tagSelected, setTagSelected] = useState([]);
    const [notes, setNotes] = useState([]);

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

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagSelected}`);
            setNotes(response.data);
        }

        fetchNotes();
    }, [tagSelected, search]);

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
                <Input 
                    placeholder= "Pesquisar pelo título" 
                    onChange={() => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title= "Minhas notas">
                    {
                        notes.map(note =>(
                        <Note 
                            key={String(note.id)}
                            data={note}
                        />
                        ))
                    }

                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus/>
                Criar Nota
            </NewNote>

        </Container>
    );
}