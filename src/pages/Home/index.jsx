import { FiPlus } from "react-icons/fi";
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles"
import { Note } from "../../components/Note";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Home() {
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const [tagSelected, setTagSelected] = useState([]);
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate();

    function handleTagSelected(tagName) {
        if(tagName === "all") {
            return setTagSelected([]);
        }

        const alreadySelected = tagSelected.includes(tagName);

        if (alreadySelected) {
            const filteredTags = tagSelected.filter(tag => tag !== tagName);
            setTagSelected(filteredTags);
        } else {
            setTagSelected(prevState => [...prevState, tagName]);
        }
     }

    function handleDetails(id) {
        navigate(`/details/${id}`);
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
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title= "Minhas notas">
                    {
                        notes.map(note =>(
                        <Note 
                            key={String(note.id)}
                            data={note}
                            onClick={() => handleDetails(note.id)}
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