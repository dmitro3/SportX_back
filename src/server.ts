import {NgrokSessionBuilder} from '@ngrok/ngrok';
import {Logger} from '@nestjs/common';

async function server() {
    const config = {
        port: 3000,
        ngrokToken: "1m4hjJ5VRkpm1ibb4SwkolTZPHp_2EtR2yfjBztjNcpgLa71w"
    }

    const session = await new NgrokSessionBuilder()
        .authtoken(config.ngrokToken)
        .connect();
    const tunnel = await session
        .httpEndpoint()
        .listen();
    new Logger('main').log(`Ingress established at ${tunnel.url()}`);

    await tunnel.forwardTcp(`localhost:${config.port}`);
}

server();
