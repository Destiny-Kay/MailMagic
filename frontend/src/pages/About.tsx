import { Container } from "@radix-ui/themes";
import WebLayout from "../layouts/WebLayout";

export default function About() {
    return(
        <WebLayout>
            <Container className="mt-20">
                <p>About Magic Mailer</p>
            </Container>
        </WebLayout>
    )
}