
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
  ],
  // NÍVEL 11: Mistura (Café, Transportes, Espaço, Expressões)
  [
    {
      words: ["Bica", "Carioca", "Abatanado", "Expresso"],
      category: "Formas de pedir um Café",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Comboio", "Autocarro", "Elétrico", "Metro"],
      category: "Transportes Públicos",
      difficulty: "médio",
      color: "#a0c35a"
    },
    {
      words: ["Sol", "Lua", "Marte", "Vénus"],
      category: "Corpos Celestes",
      difficulty: "médio",
      color: "#b0c4ef"
    },
    {
      words: ["Pneu", "Língua", "Pau", "Bacalhau"],
      category: "Coisas que se podem 'Dar'", // Dar um pneu, dar à língua...
      difficulty: "difícil",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 12: Mistura (Lacticínios, Ervas, Futebol, Geometria)
  [
    {
      words: ["Galão", "Garoto", "Chinês", "Meia-de-leite"],
      category: "Café com Leite",
      difficulty: "médio",
      color: "#f9df6d"
    },
    {
      words: ["Salsa", "Coentros", "Alecrim", "Manjericão"],
      category: "Ervas Aromáticas",
      difficulty: "médio",
      color: "#a0c35a"
    },
    {
      words: ["Canto", "Livre", "Fora", "Penalty"],
      category: "Reinícios de Jogo no Futebol",
      difficulty: "fácil",
      color: "#b0c4ef"
    },
    {
      words: ["Régua", "Compasso", "Esquadro", "Transferidor"],
      category: "Instrumentos de Geometria",
      difficulty: "difícil",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 13: Mistura (Cerveja, Animais, Cozinha, Gramática)
  [
    {
      words: ["Imperial", "Fino", "Príncipe", "Girafa"],
      category: "Cerveja de Pressão (PT-PT)",
      difficulty: "difícil", // Difícil porque Girafa e Príncipe parecem de outros grupos
      color: "#f9df6d"
    },
    {
      words: ["Cão", "Gato", "Hamster", "Coelho"],
      category: "Animais de Estimação",
      difficulty: "fácil",
      color: "#a0c35a"
    },
    {
      words: ["Assar", "Ferver", "Grelhar", "Estufar"],
      category: "Métodos de Cozedura",
      difficulty: "médio",
      color: "#b0c4ef"
    },
    {
      words: ["Agudo", "Grave", "Til", "Circunflexo"],
      category: "Acentos e Sinais Gráficos",
      difficulty: "médio",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 14: Mistura (Roupa, Órgãos, Lanches, Expressões)
  [
    {
      words: ["Calça", "Saia", "Vestido", "Camisa"],
      category: "Peças de Roupa",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Olho", "Nariz", "Boca", "Ouvido"],
      category: "Órgãos da Face",
      difficulty: "fácil",
      color: "#a0c35a"
    },
    {
      words: ["Bifana", "Prego", "Panado", "Rissol"],
      category: "Lanches/Salgados de Café",
      difficulty: "médio",
      color: "#b0c4ef"
    },
    {
      words: ["Livre", "Santo", "Raso", "Morto"],
      category: "____ Espírito", // Espírito Livre, Espírito Santo...
      difficulty: "difícil",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 15: Mistura (Cidades, Sentidos, Escolar, Vinhos)
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
      color: "#a0c35a" // Faro engana aqui
    },
    {
      words: ["Lápis", "Caneta", "Borracha", "Afia"],
      category: "Material de Escrita",
      difficulty: "fácil",
      color: "#b0c4ef"
    },
    {
      words: ["Branco", "Tinto", "Rosé", "Verde"],
      category: "Tipos de Vinho",
      difficulty: "médio",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 16: Mistura (Browsers, Medicina, Miudezas, Mecânica)
  [
    {
      words: ["Chrome", "Firefox", "Safari", "Edge"],
      category: "Browsers de Internet",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Coração", "Fígado", "Rins", "Língua"],
      category: "Órgãos Internos",
      difficulty: "médio",
      color: "#a0c35a"
    },
    {
      words: ["Pente", "Serra", "Alho", "Engrenagem"],
      category: "Coisas que têm dentes",
      difficulty: "difícil",
      color: "#b0c4ef"
    },
    {
      words: ["Volante", "Travão", "Pedal", "Mudanças"],
      category: "Controlos de um Carro",
      difficulty: "médio",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 17: Mistura (Moedas, Tempo, Verbos, Natureza)
  [
    {
      words: ["Euro", "Dólar", "Libra", "Iene"],
      category: "Moedas Oficiais",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Minuto", "Hora", "Segundo", "Dia"],
      category: "Unidades de Tempo",
      difficulty: "fácil",
      color: "#a0c35a"
    },
    {
      words: ["Mata", "Vence", "Bate", "Triunfa"],
      category: "Sinónimos de Derrotar",
      difficulty: "médio",
      color: "#b0c4ef"
    },
    {
      words: ["Vento", "Lã", "Vidro", "Cabra"],
      category: "Pé de ____", // Pé de vento, pé de lã...
      difficulty: "difícil",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 18: Mistura (Gíria, Capitais, Jogos, Astronomia)
  [
    {
      words: ["Massa", "Guito", "Arame", "Pilim"],
      category: "Gíria para Dinheiro",
      difficulty: "médio",
      color: "#f9df6d"
    },
    {
      words: ["Madrid", "Paris", "Roma", "Berlim"],
      category: "Capitais Europeias",
      difficulty: "fácil",
      color: "#a0c35a"
    },
    {
      words: ["Xadrez", "Damas", "Gamão", "Dominó"],
      category: "Jogos de Tabuleiro",
      difficulty: "fácil",
      color: "#b0c4ef"
    },
    {
      words: ["Nova", "Cheia", "Quarto", "Crescente"],
      category: "Fases da Lua",
      difficulty: "médio",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 19: Mistura (Baralho, Rios, Roupa, Receitas)
  [
    {
      words: ["Rei", "Dama", "Valete", "Ás"],
      category: "Cartas de Figuras",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Tejo", "Douro", "Sado", "Guadiana"],
      category: "Rios de Portugal",
      difficulty: "médio",
      color: "#a0c35a"
    },
    {
      words: ["Manga", "Gola", "Punho", "Costura"],
      category: "Partes de uma Camisa",
      difficulty: "médio",
      color: "#b0c4ef"
    },
    {
      words: ["Brás", "Gomes", "Zé", "Lagareiro"],
      category: "Estilos de Bacalhau (____ de Sá)",
      difficulty: "difícil",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 20: Mistura (Cordas, Doce, Ferramentas, Objetos)
  [
    {
      words: ["Guitarra", "Violino", "Baixo", "Violoncelo"],
      category: "Instrumentos de Cordas",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Açúcar", "Mel", "Caramelo", "Estévia"],
      category: "Adoçantes",
      difficulty: "fácil",
      color: "#a0c35a"
    },
    {
      words: ["Martelo", "Alicate", "Berbequim", "Serra"],
      category: "Ferramentas",
      difficulty: "médio",
      color: "#b0c4ef"
    },
    {
      words: ["Alfinete", "Prego", "Alho", "Repolho"],
      category: "Coisas que têm 'Cabeça'",
      difficulty: "difícil",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 21: Mistura (Peixes, Futebol, Acessórios, Cidades)
  [
    {
      words: ["Bacalhau", "Sardinha", "Polvo", "Dourada"],
      category: "Peixes na Gastronomia PT",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Chuteiras", "Caneleiras", "Luvas", "Meias"],
      category: "Equipamento de Futebol",
      difficulty: "médio",
      color: "#a0c35a"
    },
    {
      words: ["Chapéu", "Cinto", "Luva", "Sapato"],
      category: "Acessórios",
      difficulty: "fácil",
      color: "#b0c4ef"
    },
    {
      words: ["Conto", "Escudo", "Reais", "Pataca"],
      category: "Moedas Antigas ou de Macau",
      difficulty: "difícil",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 22: Mistura (Bicicleta, Petiscos, Escrita, Corpos)
  [
    {
      words: ["Selim", "Guiador", "Corrente", "Roda"],
      category: "Partes de uma Bicicleta",
      difficulty: "médio",
      color: "#f9df6d"
    },
    {
      words: ["Moelas", "Pica-pau", "Caracóis", "Chouriço"],
      category: "Petiscos de Taberna",
      difficulty: "médio",
      color: "#a0c35a"
    },
    {
      words: ["Ponto", "Vírgula", "Aspas", "Parênteses"],
      category: "Sinais de Pontuação",
      difficulty: "fácil",
      color: "#b0c4ef"
    },
    {
      words: ["Peão", "Torre", "Bispo", "Cavalo"],
      category: "Peças de Xadrez",
      difficulty: "médio",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 23: Mistura (Cores, Sobremesas, Tempo, Cinema)
  [
    {
      words: ["Azul", "Verde", "Amarelo", "Vermelho"],
      category: "Cores Primárias",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Arroz", "Ovos", "Leite", "Natas"],
      category: "____ Doce (Sobremesas PT)",
      difficulty: "difícil",
      color: "#a0c35a"
    },
    {
      words: ["Relógio", "Calendário", "Cronómetro", "Ampulheta"],
      category: "Medidores de Tempo",
      difficulty: "médio",
      color: "#b0c4ef"
    },
    {
      words: ["Ator", "Realizador", "Guião", "Câmara"],
      category: "Produção de Cinema",
      difficulty: "médio",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 24: Mistura (Casa, Cães, Jogos, Meteorologia)
  [
    {
      words: ["Parede", "Teto", "Chão", "Telhado"],
      category: "Estrutura de uma Casa",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Amigo", "Fila", "Polícia", "Guarda"],
      category: "Cão de ____",
      difficulty: "difícil",
      color: "#a0c35a"
    },
    {
      words: ["Sueca", "Bisca", "Burro", "Copas"],
      category: "Jogos de Cartas em Portugal",
      difficulty: "médio",
      color: "#b0c4ef"
    },
    {
      words: ["Nuvem", "Sol", "Chuva", "Neve"],
      category: "Fenómenos Meteorológicos",
      difficulty: "fácil",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 25: Mistura (Gramática, Emoções, Pedras, Construção)
  [
    {
      words: ["Sujeito", "Verbo", "Objeto", "Advérbio"],
      category: "Gramática",
      difficulty: "médio",
      color: "#f9df6d"
    },
    {
      words: ["Alegria", "Tristeza", "Raiva", "Medo"],
      category: "Emoções Básicas",
      difficulty: "fácil",
      color: "#a0c35a"
    },
    {
      words: ["Turquesa", "Esmeralda", "Safira", "Jade"],
      category: "Pedras Preciosas / Tons",
      difficulty: "difícil",
      color: "#b0c4ef"
    },
    {
      words: ["Cimento", "Tijolo", "Areia", "Gesso"],
      category: "Materiais de Construção",
      difficulty: "médio",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 26: Mistura (Cinema, Montanhas, Corpo, Casa)
  [
    {
      words: ["Óscares", "Globos", "Palma", "Urso"],
      category: "Prémios de Cinema",
      difficulty: "difícil",
      color: "#f9df6d"
    },
    {
      words: ["Atlas", "Alpes", "Andes", "Pirinéus"],
      category: "Cadeias de Montanhas",
      difficulty: "médio",
      color: "#a0c35a"
    },
    {
      words: ["Perna", "Joelho", "Anca", "Tornozelo"],
      category: "Membro Inferior",
      difficulty: "fácil",
      color: "#b0c4ef"
    },
    {
      words: ["Janela", "Porta", "Varanda", "Chaminé"],
      category: "Aberturas da Casa",
      difficulty: "médio",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 27: Mistura (Teatro, Sentimentos, Árvores, Metal)
  [
    {
      words: ["Plateia", "Palco", "Bancada", "Camarote"],
      category: "Zonas de um Espetáculo",
      difficulty: "médio",
      color: "#f9df6d"
    },
    {
      words: ["Frio", "Calor", "Gelado", "Seco"],
      category: "Sensações Térmicas",
      difficulty: "médio",
      color: "#a0c35a"
    },
    {
      words: ["Pinheiro", "Carvalho", "Sobreiro", "Eucalipto"],
      category: "Árvores Comuns em PT",
      difficulty: "médio",
      color: "#b0c4ef"
    },
    {
      words: ["Ouro", "Prata", "Cobre", "Bronze"],
      category: "Metais / Medalhas",
      difficulty: "fácil",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 28: Mistura (Canalização, Desporto, Família, Estações)
  [
    {
      words: ["Cano", "Sifão", "Torneira", "Ralo"],
      category: "Canalização",
      difficulty: "médio",
      color: "#f9df6d"
    },
    {
      words: ["Futebol", "Andebol", "Futsal", "Voleibol"],
      category: "Desportos de Equipa",
      difficulty: "fácil",
      color: "#a0c35a"
    },
    {
      words: ["Primo", "Tio", "Avô", "Irmão"],
      category: "Familiares",
      difficulty: "fácil",
      color: "#b0c4ef"
    },
    {
      words: ["Primavera", "Verão", "Outono", "Inverno"],
      category: "Estações do Ano",
      difficulty: "fácil",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 29: Mistura (Flores, Divisões, Temperos, Contos)
  [
    {
      words: ["Rosa", "Túlipa", "Margarida", "Orquídea"],
      category: "Flores",
      difficulty: "fácil",
      color: "#f9df6d"
    },
    {
      words: ["Cozinha", "Sala", "Quarto", "Sótão"],
      category: "Divisões da Casa",
      difficulty: "fácil",
      color: "#a0c35a"
    },
    {
      words: ["Sal", "Pimenta", "Caril", "Açafrão"],
      category: "Especiarias",
      difficulty: "médio",
      color: "#b0c4ef"
    },
    {
      words: ["Gato", "Bota", "Sapo", "Cinderela"],
      category: "Relacionado com Contos de Fadas",
      difficulty: "médio",
      color: "#ba81c5"
    }
  ],

  // NÍVEL 30: Nível Final (Meta e Abstrato)
  [
    {
      words: ["Nível", "Grupo", "Palavra", "Cor"],
      category: "Elementos deste Jogo",
      difficulty: "muito difícil",
      color: "#f9df6d"
    },
    {
      words: ["Folha", "Linha", "Ponto", "Margem"],
      category: "Relacionado com Cadernos",
      difficulty: "médio",
      color: "#a0c35a"
    },
    {
      words: ["Pai", "Lar", "Batata", "Água"],
      category: "____ Doce",
      difficulty: "difícil",
      color: "#b0c4ef"
    },
    {
      words: ["Dominó", "Segurar", "Terço", "Quintal"],
      category: "Começam com dias da semana",
      difficulty: "muito difícil",
      color: "#ba81c5"
    }
  ]
];
