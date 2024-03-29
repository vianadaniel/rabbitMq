const amqp = require('amqplib');

async function testarConexao() {
    try {

        const connection = await amqp.connect('amqp://guest:guest@localhost:5672');

        // Crie um canal
        const channel = await connection.createChannel();

        // Declare uma fila de teste
        const queue = 'fila_teste';
        await channel.assertQueue(queue);

        // Envie uma mensagem de teste para a fila
        const mensagem = 'Esta é uma mensagem de teste';
        channel.sendToQueue(queue, Buffer.from(mensagem));

        console.log('Conexão estabelecida com sucesso e mensagem enviada.');

        console.log('Aguardando mensagens...');

        await channel.consume(queue, (message) => {
            if (message !== null) {
                console.log('Mensagem recebida:', message.content.toString());
                channel.ack(message); // Acknowledge the message
            }
        });

        // Feche o canal e a conexão
        await channel.close();
        await connection.close();
        // console.log('GOl')
    } catch (error) {
        console.error('Erro ao testar conexão:', error);
    }
}

// Chame a função de teste
// docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

testarConexao();