const amqp = require('amqplib');

async function testarConexao() {
    try {
        Estabeleça a conexão com o RabbitMQ
        const connection = await amqp.connect('amqp://admin:admin@localhost:5672');

        // Crie um canal
        const channel = await connection.createChannel();

        // Declare uma fila de teste
        const queue = 'fila_teste';
        await channel.assertQueue(queue);

        // Envie uma mensagem de teste para a fila
        const mensagem = 'Esta é uma mensagem de teste';
        channel.sendToQueue(queue, Buffer.from(mensagem));

        console.log('Conexão estabelecida com sucesso e mensagem enviada.');

        // Feche o canal e a conexão
        await channel.close();
        await connection.close();
        // console.log('GOl')
    } catch (error) {
        console.error('Erro ao testar conexão:', error);
    }
}

// Chame a função de teste
testarConexao();