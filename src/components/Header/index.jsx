import { Container, Profile, Logout } from "./styles";
import { useAuth } from "../../hooks/auth"
import { RiShutDownLine } from 'react-icons/ri'

export function Header() {
    const { signOut } = useAuth();

    return (
       <Container>
            <Profile to="/profile">
                <img src="https://github.com/Leonardo1205.png" alt="Foto do usuário" />

                <div>
                    <span>Bem-Vindo</span>
                    <strong>Leonardo Reitz</strong>
                </div>
            </Profile>

            <Logout onClick={signOut}>
                <RiShutDownLine />
            </Logout>
       </Container>
    )
}