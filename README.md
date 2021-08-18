<h1>Voltbras Backend-challenge</h1>

<p>O ano é 2118, 100 anos após a fundação da Voltbras. Expandimos nosso negócios para gerenciamento de carregamento de veículos espaciais não tripulados com propulsão de íons.
O Propulsor de Íons é um dos diversos tipos de propulsão espacial, que utiliza feixes de luz à base de energia elétrica (aí onde entra a Voltbras, iremos fornecer esta energia).
Especificamente, esta propulsão de energia deve ser provinda de combustível nuclear, pois a força de impulsão é muito forte.
Se a inserção do combustível for realizada num planeta de baixa gravidade, acontece a fissão do combustível nuclear e perde-se bastante potencial energético.
Por isso precisamos realizar o abastecimento das naves em planetas com alta gravidade, nos quais chega a ser 100 vezes mais eficiente o abastecimento.
O seu trabalho é descobrir em quais planetas a Voltbras pode instalar seus novos postos de carregamento e otimizar a experiência de recarga para os viajantes espaciais.

Para isso:

- utilize a API de exoplanetas da NASA, o que te possibilita buscar os planetas fora do sistema solar!
- só mostre os planetas com gravidade alta, os dados não mostram exatamente qual gravidade o planeta tem, mas a Voltbras fez os cálculos e os planetas ideais(com gravidade alta), são aproximadamente os mesmos que têm sua massa maior que 10 jupiter mass (exoplanet.pl_bmassj)</p>


Clone o projeto

```bash
git@github.com:ThiagoKachi/voltbras-challenge.git
```

Instale as dependências

```bash
npm install
```

Inicie o servidor

```bash
npm run dev
```

OBS: Necessita que o mongo esteja rodando, optei em rodar pelo Docker.
  - Pequeno tutorial de como fazer: https://balta.io/blog/mongodb-docker

<br/>

Endpoint utilizado
```bash
https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+ps+where+pl_bmassj+between+10+and+80&format=json
```

<h1>Querys</h1>
<h2>suitablePlanets:</h2>
  - Recebe os dados da API da NASA, já fitrado com os planetas ideias para receber as estações de carregamento da Voltbras(massa maior que 10 jupiter mass).
  <br/>
  - Retorna algumas informações sobre o planeta, como o nome, massa e ano de descobrimento.
  <br/>
  - <strong>Ao executar essa query, cria um banco de dados no mongo com o nome `graphql` e cria uma collection chamada `planets`.</strong>
  <br/>
  <br/>
<h2>planets:</h2>
  - Lista todos os planetas, já atualizados, mostrando se existe ou não estações instaladas no mesmo e qual o dia e hora que necessita fazer uma recarga na estação.
  <br/>
  <br/>
<h2>stations:</h2>
  - Lista somente os planetas que contém estações instaladas.
  <br/>
  <br/>

<h1>Mutations</h1>
<h2>installStation:</h2>
 - Recebe dois parâmetros, o `id` do planeta a ser instalado a estação de abastecimento e `hasstation` que determina que será instalado a estação no planeta(passar `true` como valor).
  <br/>
  <br/>
<h2>recharge:</h2>
  - Recebe apenas o parâmetro `id`, que informa qual o planeta que irá necessitar de uma recarga dentro de 15 dias(valor iniciado a partir do momento de executa a Mutation `recharge`)


