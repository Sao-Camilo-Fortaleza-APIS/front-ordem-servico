import { Bot } from "lucide-react";
import { Container } from "../styles/ViewOrders.styles";

export function PendingOrders() {
    return (
        <Container>
            <div className="wrapper" style={{ justifySelf: "center", alignSelf: "center", color: "GrayText" }}>
                <h3>Ordens pendentes</h3>

                <p style={{ display: 'flex', alignItems: "center", gap: '1rem', justifyItems: "center" }}>
                    <Bot size={24} />
                    Função em processo de desenvolvimento...
                </p>
            </div>
        </Container>
    )
}