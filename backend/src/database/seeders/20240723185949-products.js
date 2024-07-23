"use strict";

const ProductService = require('../../services/ProductService.js');

const productService = new ProductService();

/** @type {import(sequelize-cli).Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
        */
        const productsData = [
            {
                title: 'Fjallraven - Foldsack No. 1 Backpack, Acomoda até 15 laptops',
                price: '109.95',
                stock: 100,
                description: 'Seu pacote perfeito para uso diário e caminhadas pela floresta. Armazene seu laptop (até 15 polegadas) na manga protegida, suas necessidades cotidianas.',
                categories: ['homens'],
                image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
                rating: { rate: 3.9, count: 120 },
            },
            {
                title: 'Camiseta Masculina Casual Premium Ajustada Slim',
                price: '22.30',
                stock: 67,
                description: 'Estilo ajustado, gola longa em contraste com costura de raglan, abotoaduras de três botões na parte frontal de henley, tecido leve e macio para uso respirável e confortável. E camisas costuradas sólidas com gola redonda feitas para durabilidade e um ótimo ajuste para vestir casualmente e fãs apaixonados de beisebol. O estilo Henley inclui uma gola redonda com uma abotoadura de três botões.',
                categories: ['homens'],
                image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
                rating: { rate: 4.1, count: 259 },
            },
            {
                title: 'Jaqueta de Algodão Masculina',
                price: '55.99',
                stock: 27,
                description: 'Ótimas jaquetas de capa externa para Primavera/Outono/Inverno, adequadas para muitas ocasiões, como trabalho, trilha, acampamento, escalada de montanha/rochas, ciclismo, viagens ou outras atividades ao ar livre. Boa escolha de presente para você ou um membro da sua família. Um carinho quente para Pai, marido ou filho neste Dia das Crianças ou Natal.',
                categories: ['homens'],
                image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
                rating: { rate: 5, count: 500 },
            },
            {
                title: 'Casual Masculino Slim Fit',
                price: '15.99',
                stock: 220,
                description: 'A cor pode ser ligeiramente diferente entre o que é mostrado na tela e na prática. / Por favor, note que os tipos corporais variam de pessoa para pessoa, portanto, informações detalhadas sobre o tamanho devem ser revisadas abaixo na descrição do produto.',
                categories: ['homens'],
                image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
                rating: { rate: 2.1, count: 430 },
            },
            {
                title: "Brincanteira de Cobra Dragão Naga Ouro e Prata da Coleção Legendas da John Hardy",
                price: '695.00',
                stock: 453,
                description: "Da nossa Coleção Legendas, a Naga foi inspirada na dragã mitológica que protege a pérola do oceano. Use voltada para dentro para ser abençoada com amor e abundância, ou voltada para fora para proteção.",
                categories: ['joalheria'],
                image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
                rating: { rate: 1.6, count: 400 },
            },
            {
                title: 'Petite Micropave de Ouro Puro',
                price: '168.00',
                stock: 17,
                description: 'Garantia de Satisfação. Devolver ou trocar qualquer pedido dentro de 30 dias. Projeto e venda pelo Hafeez Center nos Estados Unidos. Garantia de Satisfação. Devolver ou trocar qualquer pedido dentro de 30 dias.',
                categories: ['joalheria'],
                image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
                rating: { rate: 4.9, count: 70 },
            },
            {
                title: 'Princesa Revestida em Ouro Branco',
                price: '9.99',
                stock: 187,
                description: "Anel de Promessa de Diamante Solitário Clássico Criado para Ela. Presentes para enriquecer ainda mais seu amor para Casamento, Aniversário, Dia dos Namorados...",
                categories: ['joalheria'],
                image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
                rating: { rate: 9, count: 400 },
            },
            {
                title: 'Orelhas de Pomba-rei Perfuradas Revestidas em Ouro Rosa',
                price: '10.99',
                stock: 43,
                description: 'Orelhas Duplas de Túnel Aumentadas Revestidas em Ouro Rosa. Feitas de Aço Inoxidável 316L',
                categories: ['joalheria'],
                image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
                rating: { rate: 1.9, count: 100 },
            },
            {
                title: 'Disco Rígido Externo Portátil WD 2TB Elements - USB 3.0',
                price: '64.00',
                stock: 100,
                description: 'Compatibilidade com USB 3.0 e USB 2.0 Transferência rápida de dados Melhora o desempenho do PC Alta capacidade; Formato compatível NTFS para Windows 10, Windows 8.1, Windows 7; Reformatação pode ser necessária para outros sistemas operacionais; A compatibilidade pode variar dependendo da configuração de hardware e sistema operacional do usuário',
                categories: ['eletronicos'],
                image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
                rating: { rate: 4.3, count: 203 },
            },
            {
                title: 'SSD Interno SanDisk SSD PLUS 1TB - SATA III 6 Gb/s',
                price: '109.00',
                stock: 89,
                description: 'Atualização fácil para inicialização mais rápida, desligamento, carga e resposta de aplicativos (Comparado a disco rígido HDD 5400 RPM SATA 2.5”; Baseado em especificações publicadas e testes internos de benchmark usando pontuações PCMark Vantage) Aumenta o desempenho de escrita em rajadas, tornando-o ideal para cargas de trabalho típicas de PC Equilíbrio perfeito entre desempenho e confiabilidade Velocidades de leitura/gravação de até 535 MB/s/450 MB/s (Baseado em testes internos; O desempenho pode variar dependendo da capacidade do disco, dispositivo host, sistema operacional e aplicação)',
                categories: ['eletronicos'],
                image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
                rating: { rate: 5.9, count: 470 },
            },
            {
                title: 'SSD Silicon Power 256GB 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
                price: '109.00',
                stock: 55,
                description: 'Aplique-se tecnologia 3D NAND flash para entregar altas velocidades de transferência Notáveis velocidades de transferência que permitem inicialização mais rápida e melhor desempenho geral do sistema. A avançada tecnologia SLC Cache permite aumento de desempenho e vida útil mais longa Design fino de 7mm adequado para Ultrabooks e notebooks ultra-eslembrosos. Suporta comando TRIM, tecnologia de Coleta de Resíduos, RAID e ECC (Verificação e Correção de Erros) para fornecer desempenho otimizado e maior confiabilidade.',
                categories: ['eletronicos'],
                image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
                rating: { rate: 4.8, count: 319 },
            },
        ]

        try {
            for (const productData of productsData) {
                await productService.createProduct(productData);
            }
            console.log('Products seeded successfully!');
        } catch (error) {
            console.error('Failed to seed products:', error);
        }
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         */
        await queryInterface.bulkDelete('Products', null, {});
        await queryInterface.bulkDelete('Categories', null, {});
    }
};
