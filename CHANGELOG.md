# **🧰 Pequena atualização!**

Seguindo a atualização realizada ontem, envio uma pequena atualização de qualidade para o jogo.

## Utilitários

- **PathResolver**: Agora nomeado **``GamePathResolver``**, pois ele usa a pasta de ``maskeria-game`` como root, diferentemente do **``PathResolver``** mais genérico, que está localizado em ``shared/`` do repositório `maskeria`.
- **AssetResolver**: Agora nomeado **``GameAssetResolver``** para padronizar com a nomenclatura usada em ``GamePathResolver``.

## Jogo

- **Game.js**: Agora possui em seu constructor um objeto que recebe ``canvasSelector`` e ``uiRootSelector``, que permite você selecionar os contâineres de renderização e interface, respectivamente. O padrão usado para o selector é o mesmo de ``document.querySelector()``.
