

const removeComments=(code)=>{
    return code
      .replace(/\/\/.*$/gm,"")
      .replace(/\/\*[\s\S]*?\*\//g,"")
};

const normalizeCode=(code)=>{
   let result=removeComments(code);
   result=result.replace(
    /"(?:\\.|["\\])*"/g,
    "STRING"
   );

   result=result.replace(
    /'(?:\\.|[^\\])*'/g,
    "STRING"
   )

   result=result.replace(
    /\s+/g,
    " "
   );

   return result.trim();
}

const tokenizeCode=(code)=>{
  const normalized=normalizeCode(code);

  const tokens=normalized.match(
    /[A-Za-z_][A-Za-z0-9]*|[0-9]+|==|!=|<=|>=|\+\+|--|&&|\|\||[{}()[\]];,.+\-\*/%=[]/g
  );
  return tokens||[];
}


const normalizeToken=(tokens)=>{
    const keywords=new Set([
      "int",
      "float",
      "double",
      "char",
      "bool",
      "void",
      "long",
      "short",
      "unsigned",
      "signed",
      "struct",
      "class",
      "public",
      "private",
      "protected",
      "using",
      "namespace",
      "include",
      "auto",

      "static",
      "final",
      "extends",
      "implements",
      "interface",
      "package",
      "import",
      "new",
      "this",
      "super",

      "let",
      "const",
      "var",
      "function",
      "export",
      "default",
      "async",
      "await",


      "if",
      "else",
      "for",
      "while",
      "do",
      "switch",
      "case",
      "break",
      "continue",
      "return",

      "true",
      "false",
      "null",
      "undefined",
    ])

    return tokens.map((token)=>{
      const isIdentifier=/^[A-Za-z_][A-Za-z0-9_]*$/.test(token);
      if(isIdentifier&&!keywords.has(token)){
        return "IDENTIFIER"
      }

      return token;
        })


}

const calculatesimilarity=(tokens1,tokens2)=>{
     const set1=new Set(tokens1);
     const set2=new Set(tokens2);
     const intersection=new Set(
      [...set1].filter((item)=>set2.has(item))
     )
};
const union=new Set([
  ...set1,
  ...set2
]);

if(union.size==0){
  return 0;
}

return(
  intersection.size/union.size
)*100;


const calculateSequenceSimilarity=(tokens1,
  tokens2
)=>{
   const string1=tokens1.join(" ");
   const string2=tokens2.join(" ");

   const distance=natural.LevenshinDistance(
    string1,string2
   );

   const maxLenght=Math.max(
    string1.length,
    string2.length
   );

   if(MaxLength===0){
    return 100;
   }

   return(
    1-distance/maxLenght
   )*100;
}

const calculateCodeSmilarity=(code1,code2)=>{
  const rawtokens1=tokenizeCode(code1);

  const rawtoekens2=tokenizeCode(code2);
  const tokens1=normalizeToken(rawtokens1);
  const tokens2=normalizeToken(rawtoekens2);

  const jaccard=calculateCodeSmilarity(tokens1,tokens2)

  const sequence=calculateCodeSmilarity(tokens1,tokens2);

  const finalScore=jaccard*0.4+sequence*0.6;
  return Number(
    finalScore.toFixed(2)
  )
};
module.exports={
  removeComments,
  normalizeCode,
  tokenizeCode,
  normalizeToken,
  calculateCodeSmilarity
}
