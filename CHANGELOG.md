# 🧰 **Pequena atualização!**

Seguindo as melhorias estruturais recentes, envio uma nova atualização focada em arquitetura e desacoplamento do fluxo de cenas.

## Utilitários

### **`SceneFactory`**

Agora realiza importação dinâmica de cenas com base no nome informado, utilizando `StringCaseFormatter.toPascalCase()`. Isso permite criar novas cenas apenas adicionando o arquivo correspondente em `scenes/`, sem precisar registrá-las manualmente.

### **`StringCaseFormatter`**

Alterado para gerar cada formatação com base no *kebab case*.

## Núcleo do Jogo

### **`SceneManager`** e **`SceneFactory`**

- A troca agora é feita via evento `scene:start`, que recebe:
```json
{
    "scene": "nome-da-cena",
    "options": {}
}
```
- O `Game` delega a criação da cena ao `SceneFactory`.
- `SceneManager` continua responsável apenas por `setNext()` e `change()`.
    - O método `change()` de `SceneManager` foi renomeado para `setNext()` sem alterações de implementação.
    - O método `applyChange()` de `SceneManager` foi renomeado para `change()` sem alterações de implementação.
- Separação clara entre `env` e `options` nas cenas:
    - `env`: dependências padrão (`game`, `bus`, `renderer`, `$uiRoot`, `panels`).
    - `options`: parâmetros específicos da cena.
- A classe base `Scene` agora recebe ambos no `constructor`.

## UI

### **`MenuPanel`**
- Agora o botão de opções se chama "Opções" ao invés de "Options".

## Renderização

### **`Renderer`**:

- O método `drawBackground()` foi renomeado para `drawBGContain()` sem alterações de implementação.
- O método `clean()` foi renomeado para `clear()` sem alterações de implementação.
- Adicionado método `drawBGCover()` para renderização proporcional de imagens de fundo com crop inteligente.
- Sistema de `resize()` integrado ao evento `window:resize`.

## Sistema de Redimensionamento

- O redimensionamento do canvas agora:
  - É disparado via evento `window:resize`.
  - É escutado pelo `Game`.
  - Possui debounce interno para evitar múltiplos recalculamentos.