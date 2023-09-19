/** *
 *Função para obter informações do CEP usando a api ViaCEP
 *
 * @param {string} cep - O CEP a ser consultado
 * @returns {Objeto|null} - Um objeto conted=ndo os dados do CEP ou nulo
 */
async function obtemCep(cep) {
    const url = `http://viacep.com.br/ws/${cep}/json/`
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}

/**
 * Função para consultar e preencher os campos do endereço a partir do cep
 */
async function consultarCEP() {
    //obtendo o valor do cep no formulário
    const cep = document.getElementById('cep').value
    const logradouro = document.getElementById('logradouro')
    const cidade = document.getElementById('cidade')
    const bairro = document.getElementById('bairro')
    const estado = document.getElementById('estado')

    if (!cep || cep.length < 8) {
        resultadoCep.textContent = '🚨 É obrigatório informar um CEP!'
        return
    } else {
        resultadoCep.textContent = ''
        const dadosCep = await obtemCep(cep)
        if (dadosCep.erro == true) {
            resultadoCep.textContent = '❌ Erro ao conslutar o CEP informado'
            return
        }
        logradouro.value = dadosCep.logradouro
        cidade.value = dadosCep.localidade
        bairro.value = dadosCep.bairro
        estado.value = dadosCep.uf
    }
}
