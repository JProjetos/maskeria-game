# **⚙️ Grande atualização!**

Olá pessoal! Seguindo a tradição nórdica, nomeei a primeira versão da engine *Andhrimnir*, conhecido como o deus da culinária.

## Novidades do Jogo

- O menu inicial agora está disponível, apesar de não funcional.
- As logos do jogo estão disponíveis em:
    - **Preto**
    - **Branco**
    - **Preto com borda branca**
    - **Branco com borda preta**

## Novidades da Engine

### Utilitários

- **AssetResolver:** Agora é responsável por realizar precarregamento de imagens e carregamento de imagens e áudio. Além disso, cria um armazenamento cache desses arquivos, otimizando o processo de obtenção de arquivos.
- **PathResolver:** Assumiu a função do antigo AssetResolver, corrigindo os caminhos absolutos.

### Cenas (Scenes)

O jogo é baseado em cenas, cada uma com uma lógica diferente. Ou seja, cenas são a unidade mais básica de composição da renderização do jogo, fora o elemento ```<canvas>```.

Sendo assim, criei a classe ```SceneManager```, que é responsável por cuidar da cena que está sendo renderizada.

### Panéis (Panels)

Cada cena possui um conjunto de panels, isto é, grandes blocos de UI, compostos apenas de **elementos DOM**. Os panels não são renderizados como as cenas, mas montados e desmontados, ações que são realizadas de forma única, dada a natureza persistente dos elementos do DOM.

Dessa forma, cada cena é responsável por montar seus panels de acordo com sua lógica, atuando como um **stack**.

### Elementos (Elements)

É uma forma de usar componentes de forma elegante. Os dados são passados para um element e ele é responsável por montá-los em DOM.
