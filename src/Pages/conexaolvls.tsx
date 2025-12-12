
export const levels = [
  // LEVEL 1: Basic (Flavors, Speed, Beach, Music) - The one you provided
  [
    {
      words: ["Limão", "Baunilha", "Chocolate", "Menta"],
      category: "Sabores de Gelado",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Veloz", "Ágil", "Depressa", "Rápido"],
      category: "Sinónimos de Rápido",
      difficulty: "médio",
      color: "#a0c35a"
    },
    {
      words: ["Onda", "Areia", "Concha", "Maré"],
      category: "Praia",
      difficulty: "médio",
      color: "#b0c4ef"
    },
    {
      words: ["Tom", "Nota", "Tempo", "Ritmo"],
      category: "Elementos Musicais",
      difficulty: "difícil",
      color: "#ba81c5"
    }
  ],

  // LEVEL 2: Geography & Technology
  [
    {
      words: ["Teclado", "Rato", "Ecrã", "Impressora"],
      category: "Periféricos de Computador",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Norte", "Sul", "Este", "Oeste"],
      category: "Pontos Cardeais",
      difficulty: "fácil",
      color: "#a0c35a"
    },
    {
      words: ["Lisboa", "Porto", "Coimbra", "Faro"],
      category: "Cidades Portuguesas",
      difficulty: "médio",
      color: "#b0c4ef"
    },
    {
      words: ["Chrome", "Firefox", "Safari", "Edge"],
      category: "Browsers de Internet",
      difficulty: "médio",
      color: "#ba81c5"
    }
  ],

  // LEVEL 3: Kitchen & Math (Slightly harder due to abstract math terms)
  [
    {
      words: ["Garfo", "Colher", "Faca", "Prato"],
      category: "Utensílios de Mesa",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Soma", "Subtração", "Divisão", "Multiplicação"],
      category: "Operações Matemáticas",
      difficulty: "fácil",
      color: "#a0c35a"
    },
    {
      words: ["Raiz", "Quadrado", "Pi", "Expoente"],
      category: "Termos Matemáticos",
      difficulty: "difícil",
      color: "#b0c4ef"
    },
    {
      words: ["Forno", "Fogão", "Microondas", "Frigorífico"],
      category: "Eletrodomésticos",
      difficulty: "médio",
      color: "#ba81c5"
    }
  ],

  // LEVEL 4: Nature & Elements
  [
    {
      words: ["Rosa", "Túlipa", "Margarida", "Orquídea"],
      category: "Flores",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Ferro", "Ouro", "Prata", "Cobre"],
      category: "Metais",
      difficulty: "médio",
      color: "#a0c35a"
    },
    {
      words: ["Hélio", "Oxigénio", "Carbono", "Azoto"],
      category: "Elementos Químicos (Gases)",
      difficulty: "difícil",
      color: "#b0c4ef"
    },
    {
      words: ["Pinheiro", "Carvalho", "Sobreiro", "Eucalipto"],
      category: "Árvores",
      difficulty: "médio",
      color: "#ba81c5"
    }
  ],

  // LEVEL 5: Entertainment & "Sets of 4"
  [
    {
      words: ["Copas", "Espadas", "Ouros", "Paus"],
      category: "Naipes de Cartas",
      difficulty: "médio",
      color: "#f9df6d"
    },
    {
      words: ["Guitarra", "Violino", "Baixo", "Violoncelo"],
      category: "Instrumentos de Cordas",
      difficulty: "fácil",
      color: "#a0c35a"
    },
    {
      words: ["Luke", "Leia", "Han", "Chewbacca"],
      category: "Personagens de Star Wars",
      difficulty: "difícil",
      color: "#b0c4ef"
    },
    {
      words: ["Primavera", "Verão", "Outono", "Inverno"],
      category: "Estações do Ano",
      difficulty: "fácil",
      color: "#ba81c5"
    }
  ],
  // NÍVEL 6: Sobreposições de Palavras (Trick: Double Meanings)
  [
    {
      words: ["Alho", "Pente", "Humano", "Garfo"],
      category: "Coisas que têm dentes",
      difficulty: "médio",
      color: "#f9df6d"
    },
    {
      words: ["Ouro", "Prata", "Cobre", "Bronze"],
      category: "Metais / Medalhas",
      difficulty: "fácil",
      color: "#a0c35a"
    },
    {
      words: ["Estrela", "Gerês", "Arrábida", "Lousã"],
      category: "Serras de Portugal",
      difficulty: "difícil", // "Serra" do grupo amarelo é a armadilha aqui
      color: "#b0c4ef"
    },
    {
      words: ["Respire", "Mande", "Fale", "Ouça"],
      category: "Imperativos de verbos (3ª pessoa)",
      difficulty: "difícil", // "Cobre" (metal) é a armadilha
      color: "#ba81c5"
    }
  ],

  // NÍVEL 7: Associações de Palavras (Word Association)
  // TRUQUE: O grupo roxo é "Fill in the Blank" (Palavra ____).
  [
    {
      words: ["Banco", "Jardim", "Praia", "Parque"],
      category: "Locais públicos de lazer",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Pé", "Costas", "Assento", "Braço"],
      category: "Partes de uma cadeira",
      difficulty: "médio",
      color: "#a0c35a" // 
    },
    {
      words: ["Fato", "Touca", "Toalha", "Chinelo"],
      category: "Itens de natação/banho",
      difficulty: "médio",
      color: "#b0c4ef"
    },
    {
      words: ["Livre", "Santo", "Raso", "Morto"],
      category: "Palavras seguidas de '____ Espírito'",
      difficulty: "difícil", // Livre-arbítrio? Não. Espírito Livre, Espírito Santo, etc.
      color: "#ba81c5"
    }
  ],

  // NÍVEL 8: Categoria Gramatical e Cultural
  // TRUQUE: Nomes de cidades que são palavras comuns.
  [
    {
      words: ["Guarda", "Faro", "Braga", "Lagos"],
      category: "Cidades Portuguesas",
      difficulty: "médio",
      color: "#f9df6d"
    },
    {
      words: ["Visão", "Audição", "Tato", "Olfato"],
      category: "Sentidos",
      difficulty: "fácil",
      color: "#a0c35a" // "Faro" encaixa aqui como sinónimo de Olfato
    },
    {
      words: ["Calça", "Saia", "Vestido", "Camisa"],
      category: "Peças de roupa",
      difficulty: "médio",
      color: "#b0c4ef" // "Braga" (roupa antiga/cueca) é a armadilha, tal como "Guarda" (verbo ou nome)
    },
    {
      words: ["Mata", "Vence", "Bate", "Triunfa"],
      category: "Sinónimos de Ganhar/Derrotar",
      difficulty: "difícil",
      color: "#ba81c5" // "Lagos" e "Faro" não encaixam, mas "Braga" e "Guarda" distraem
    }
  ],

  // NÍVEL 9: O Desafio Abstrato (Hidden Words)
  // TRUQUE: Palavras escondidas dentro das palavras (início da palavra).
  [
    {
      words: ["Domingo", "Segunda", "Terça", "Quinta"],
      category: "Dias da semana",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Dominó", "Segurar", "Terço", "Quintal"],
      category: "Começam com dias da semana",
      difficulty: "muito difícil", // Esta é diabólica
      color: "#ba81c5"
    },
    {
      words: ["Quarto", "Sala", "Cozinha", "Casa de Banho"],
      category: "Divisões da casa",
      difficulty: "médio",
      color: "#a0c35a"
    },
    {
      words: ["Primo", "Tio", "Avô", "Irmão"],
      category: "Familiares",
      difficulty: "médio",
      color: "#b0c4ef"
    }
  ],

  // NÍVEL 10: O Nível "Pesadelo" (Homófonos e Expressões)
  // TRUQUE: Tudo parece comida ou animais, mas as categorias são baseadas em expressões idiomáticas.
  [
    {
      words: ["Gato", "Bota", "Sapo", "Cinderela"],
      category: "Contos de Fadas (com 'O' ou 'A')",
      difficulty: "médio",
      color: "#f9df6d"
    },
    {
      words: ["Mão", "Pé", "Orelha", "Boca"],
      category: "Partes do corpo",
      difficulty: "fácil",
      color: "#a0c35a"
    },
    {
      words: ["Vento", "Lã", "Vidro", "Cabra"],
      category: "Palavras após 'Pé de ____'",
      difficulty: "muito difícil", // Pé de Vento, Pé de Lã, Pé de Cabra, Pé de Vidro (flor) ou Chumbo
      color: "#ba81c5"
    },
    {
      words: ["Sapato", "Luva", "Chapéu", "Cinto"],
      category: "Acessórios",
      difficulty: "médio",
      color: "#b0c4ef" // "Bota" (do grupo amarelo) é a armadilha aqui
    }
  ]
];
