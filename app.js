//Código para formatação de campos em JAVASCRIPT
$(document).ready(function () {
    $("#inputDate").datepicker();
    $("#button").click(function () {
        $("#inputDate").datepicker("show");
    });


    $("#inputDate").on("change", function () {
        var dateText = $(this).val();
        var isValid = validarData(dateText);
        if (!isValid) {
            $(this).val('');
        }
    });

    function validarData(dateText) {
        var parts = dateText.split('/');
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);

        var date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            return false;
        }

        return true;
    }

    $("#inputDate").on('input', function (event) {
        var inputText = $(this).val();

        var formattedText = formatarData(inputText);

        $(this).val(formattedText);
    });

    function formatarData(dateText) {
        var formattedText = dateText.replace(/\D/g, ''); // Remove caracteres não numéricos
        formattedText = formattedText.replace(/^(\d{2})(\d)/g, '$1/$2'); // Adiciona a primeira barra
        formattedText = formattedText.replace(/^(\d{2}\/\d{2})(\d{1,4})/g, '$1/$2'); // Adiciona a segunda barra

        return formattedText;
    }

})

/* formatação */
var cpfSemPontuacao = cpf.replace(/[.-]/g, '');
cpfCnpj.replace(/[./-]/g, '');

/*Função com ajax*/
function continuar() {
    exibirPesquisa();

    $.ajax({
        url: pathRoot + '/NomeModulo/NomeController/NomeMetodo',
        data: JSON.stringify({
            CodigoMotivoBloqueio: "",
            MotivoBloqueio: $("#TXT_MOTIVO_BLOQUEI").val()
        }),
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8'
    }).done(function (data) {

        var grid = [];
        if (typeof filtrarGrid == 'function') {
            grid = filtrarGrid(data);
        } else {
            grid = data;
        }

        fnCriarGrid(grid);
        //pegar qtd de registros da kendoGrid
        var grid = $("#gridPesquisa").data("kendoGrid");
        var dataSource = grid.dataSource;
        //records on current view / page
        var recordsOnCurrentView = dataSource.view().length;
        //total records
        var qtdRegistro = dataSource.total();
        if (parseInt(qtdRegistro) == 0) {
            $("#div_msg").css("display", "");
        }
        else {
            $("#div_msg").css("display", "none");
        }
    }).fail(function () {
        $.notificacoes.erro("Ocorreu um erro ao obter os dados.");
    });
}

$('#btnContinuarPesq').on("click", function () {
    continuar();

});

$('#txt_motivo_bloqueio').keydown(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        continuar();
    }
});


function aoba() {
    // Expressão regular para verificar caracteres especiais
    var regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    // Valor do campo de entrada
    var input = $('#campo').val();

    // Testando se o campo contém caracteres especiais
    if (regex.test(input)) {
        alert("O campo contém caracteres especiais!");
    } else {
        alert("O campo não contém caracteres especiais!");
    }
}

//função anonima para definir campos
$(document).ready(function () {
    $("#datepicker").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: "-60d",
        maxDate: "+1y"
    });

    $("#datepicker").on("input", function () {
        var dateText = $(this).val();
        var isValid = validarData(dateText);
        if (!isValid) {
            $(this).val('');
        }
    });

    function validarData(dateText) {
        var parts = dateText.split('/');
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);

        // Verificar se a data é válida
        var date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            return false;
        }

        // Verificar se a data é posterior a 60 dias atrás
        var limiteData = new Date();
        limiteData.setDate(limiteData.getDate() - 60);
        if (date < limiteData) {
            return false;
        }

        return true;
    }
});

//valida data
$("#dt_ini_periodo").on("change", function () {
    validaDataIni();
});

$("#dt_fim_periodo").on("change", function () {
    validaDataFim();
});

//arsenal de opções
<form action="#" name="frmPesquisaJob" id="frmPesquisaJob" class="form-horizontal">
    <input type="hidden" id="num_seq_proposta_ts" />
    <input type="hidden" id="num_seq_proposta_pj_ts" />
    <input type="hidden" id="num_seq_contrato_pji_ts" />

    <div class="panel-body">
        <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th nowrap style="text-align: center; font-size: 11px;">Tipo</th>
                        <th nowrap style="text-align: center; font-size: 11px;">Filial</th>
                        <th nowrap style="text-align: center; font-size: 11px;">S</th>
                        <th nowrap style="text-align: center; font-size: 11px;">Operadora</th>
                        <th nowrap style="text-align: center; font-size: 11px;">Proposta</th>
                        <th nowrap style="text-align: center; font-size: 11px;">CNPJ</th>
                        <th nowrap style="text-align: center; font-size: 11px;">Atualização</th>
                        <th nowrap style="text-align: center; font-size: 11px;">Entrada</th>
                        <th nowrap style="text-align: center; font-size: 11px;">Situação</th>
                    </tr>
                </thead>

                <tbody id="execucoes"></tbody>

            </table>

        </div>
    </div>

</form>

//tela provavel de job
@{
    Layout = "~/Views/Shared/_LayoutPagina.cshtml";
}

@section scripts
{



    <script type="text/javascript">
        var statusPagina = '';

        //TOOLBAR
        function setupToolbar(state) {

            if (state != null && state != "") {
            statusPagina = state;
            } else {
            state = statusPagina;
            }
        var element = $('.acoes.mvc');
        element.toolbar({
            'groups': [
        {
            'buttons': [
        {'action': 'limpar', 'title': "Limpar", 'onClick': function () {limpar(); } }
        , {'action': 'avancar', 'title': "avancar", 'onClick': function () {avancar(); } }
        ]
                    }
        ],
        'controllerName': pathRoot + '/NomeModulo/NomeController',
        'state': state
            });
        }
       
       

        $(function () {

            getOperadoras();
        getReferencia();
        setupToolbar("inicio");

        });

        function getOperadoras() {
            var tam = document.getElementById('cod_operadora').length;
        var objInspetoria = document.getElementById('cod_operadora');
            for (var i = tam; i > 0; i--) {
            objInspetoria.remove(i);
            }

        //Monta combo Operadora
        $("#cod_operadora").dropbox({'url': pathRoot + '/NomeModulo/NomeController/NomeMetodo' });
        }

        function getReferencia() {
            var tam = document.getElementById('p_mes_ano_ref').length;
        var objInspetoria = document.getElementById('p_mes_ano_ref');
            for (var i = tam; i > 0; i--) {
            objInspetoria.remove(i);
            }

        //Monta combo Operadora
        $("#p_mes_ano_ref").dropbox({'url': pathRoot + '/NomeModulo/NomeController/NomeMetodo' });
        }

        function obterTabela(cod_prestador_ts) {
            var codigoPrestador = $("#cod_prestador").val();
        var pcodigoPrestador = cod_prestador_ts;
        var codigoOperadora = $("#cod_operadora").val();
        var date = $('#p_mes_ano_ref option:selected').val();
        var mesAnoReff = new Date(parseInt(date.substr(6))); // converter o valor em milissegundos para uma data
        var mesAnoRef = mesAnoReff.toLocaleDateString();
        if (codigoPrestador != "") {
            $.ajax({
                url: pathRoot + '/NomeModulo/NomeController/NomeMetodo',
                data: JSON.stringify({
                    sCodIdentificacaoTs: "",
                    txt_codprestadorts: "",
                    COD_PRESTADOR_TS: pcodigoPrestador,
                    COD_OPERADORA: codigoOperadora,
                    COD_PRESTADOR: codigoPrestador,
                    MES_ANO_REF: mesAnoRef
                }),
                method: 'POST',
                contentType: 'application/json; charset=utf-8',
                async: true,
                dataType: 'json',
                success: function (data, status) {
                    $("#1").attr('disabled', 'disabled');
                    if (data.success) {
                        var result = data.result;

                        var strGrid = '';


                        strGrid = "<table id='tblDemLibPgtoRev' cellSpacing='0' cellPadding='0' width='75%' align='center' class='input-group-addon' style='border: 1px solid #FFFFFF;'>"
                            + "<tr>"
                            + "<td width='10%'   align='center' class='grid_cabec' style='border: 1px solid #FFFFFF;'>&nbsp;Selecionar&nbsp;</td>"
                            + "<td align='left'  class='grid_cabec' style='border: 1px solid #FFFFFF;'>&nbsp;Data Solicitação&nbsp;</td>"
                            + "<td align='left'  class='grid_cabec' style='border: 1px solid #FFFFFF;'>&nbsp;NR&nbsp;</td>"
                            + "<td align='left'  class='grid_cabec' style='border: 1px solid #FFFFFF;'>&nbsp;Data Vencimento&nbsp;</td>"
                            + "<td align='left'  class='grid_cabec' style='border: 1px solid #FFFFFF;'>&nbsp;Fatura&nbsp;</td>"
                            + "<td align='right' class='grid_cabec' style='border: 1px solid #FFFFFF;'>&nbsp;Valor Solicitado&nbsp;</td>"
                            + "<td align='right' class='grid_cabec' style='border: 1px solid #FFFFFF;'>&nbsp;Valor Glosa Mantida&nbsp;</td>"
                            + "<td align='right' class='grid_cabec' style='border: 1px solid #FFFFFF;'>&nbsp;Valor Pagamento&nbsp;</td>"
                            + "</tr>";

                        for (var i = 0; i < result.length; i++) {
                            strGrid += "<tr id='trTblDemRev_" + i + "'>"
                                + "<td class='grid_center' style='border: 1px solid #FFFFFF;'><input type='checkbox' align='center' id='ind_linha_selecionada_" + i + "' name='ind_linha_selecionada_" + i + "'></td>";
                            for (var c = 0; c < 7; c++) {
                                strGrid += "<td class='grid_center' style='border: 1px solid #FFFFFF;'></td>";
                            }
                            strGrid += "</tr>";
                        }
                        strGrid += "</table>";



                        document.getElementById('gridDemLibPgtoRev').innerHTML = strGrid;


                        QtdColunasGrid = 7;
                        var tblDemLibPgtoRev = document.getElementById('tblDemLibPgtoRev');

                        /*Percorre a árvore da tabela (linhas x colunas)
                          A 1ª linha é o cabeçalho e a 1ª coluna é de seleção logo devem ser desprezados*/
                        for (var l = 0; l < result.length; l++) {
                            for (var c = 0; c < 7; c++) {
                                if (c == 0) { tblDemLibPgtoRev.rows[0].cells[c + 1].id = 'pDataSolicitacaoRev'; tblDemLibPgtoRev.rows[l + 1].cells[c + 1].innerHTML = result[l].data_solicitacao_rev; tblDemLibPgtoRev.rows[l + 1].cells[c + 1].style = 'text-align: center;'; }
                                if (c == 1) { tblDemLibPgtoRev.rows[0].cells[c + 1].id = 'pNumGrd'; tblDemLibPgtoRev.rows[l + 1].cells[c + 1].innerHTML = result[l].num_grd; tblDemLibPgtoRev.rows[l + 1].cells[c + 1].style = 'text-align: right;'; }
                                if (c == 2) { tblDemLibPgtoRev.rows[0].cells[c + 1].id = 'pDtPrevistaPgto'; tblDemLibPgtoRev.rows[l + 1].cells[c + 1].innerHTML = result[l].dt_prevista_pgt; tblDemLibPgtoRev.rows[l + 1].cells[c + 1].style = 'text-align: center;'; }
                                if (c == 3) { tblDemLibPgtoRev.rows[0].cells[c + 1].id = 'pNumFatura'; tblDemLibPgtoRev.rows[l + 1].cells[c + 1].innerHTML = result[l].num_fatura; tblDemLibPgtoRev.rows[l + 1].cells[c + 1].style = 'text-align: right;'; }
                                if (c == 4) { tblDemLibPgtoRev.rows[0].cells[c + 1].id = 'pValSolicitado'; tblDemLibPgtoRev.rows[l + 1].cells[c + 1].innerHTML = result[l].val_solicitado; tblDemLibPgtoRev.rows[l + 1].cells[c + 1].style = 'text-align: right;'; }
                                if (c == 5) { tblDemLibPgtoRev.rows[0].cells[c + 1].id = 'pGlosaMantida'; tblDemLibPgtoRev.rows[l + 1].cells[c + 1].innerHTML = result[l].glosa_mantida; tblDemLibPgtoRev.rows[l + 1].cells[c + 1].style = 'text-align: right;'; }
                                if (c == 6) { tblDemLibPgtoRev.rows[0].cells[c + 1].id = 'pValPagamento'; tblDemLibPgtoRev.rows[l + 1].cells[c + 1].innerHTML = result[l].val_pagamento; tblDemLibPgtoRev.rows[l + 1].cells[c + 1].style = 'text-align: right;'; }
                            }
                        }

                    }
                },
                error: function (data, status) {
                    $.notificacoes.erro('Erro ao recuperar as informações da classificação produtor.');
                }
            });
            }
        }

        function obterClassProd() {
            var codigoPrestador = $("#cod_prestador").val();

        if (codigoPrestador != "") {
            $.ajax({
                url: pathRoot + '/NomeModulo/NomeController/NomeMetodo',
                data: JSON.stringify({
                    sCodIdentificacaoTs: "",
                    txt_codprestadorts: "",
                    txt_codprestador: parseInt(codigoPrestador)
                }),
                method: 'POST',
                contentType: 'application/json; charset=utf-8',
                async: true,
                dataType: 'json',
                success: function (data, status) {
                    $("#1").attr('disabled', 'disabled');
                    if (data.success) {
                        var result = data.result;
                        if (result.length == 1) {
                            $("#cod_prestador").val(result[0].COD_PRESTADOR);
                            $("#nome_prestador").val(result[0].NOME_PRESTADOR);
                            var cod_prestador_ts = result[0].COD_PRESTADOR_TS;
                            obterTabela(cod_prestador_ts);
                        }
                        else {
                            $("#cod_prestador").val(codigoClassProd);
                            $("#nome_prestador").focus();
                        }
                    }
                    else {
                    }
                },
                error: function (data, status) {
                    $.notificacoes.erro('Erro ao recuperar as informações da classificação produtor.');
                }
            });
            }
        }

        $("#cod_prestador").on("change", function () {
            obterClassProd();
        });

        function AbrePesquisaWindow(urlPesq, img_name, Titulo, vWidth, vHeight, vTop, vLeft, vModal) {
            urlPesq = urlPesq.replace("?", "$$$")
            var vURL = '/nomeModulo/ex.asp?' + urlPesq + '&Titulo=' + Titulo;
        window.top.AbrePesquisa(vURL, img_name, Titulo, vWidth, vHeight, vTop, vLeft, vModal);
        }

        function modal() {
            var cod_operadora_s = $('#cod_operadora option:selected').val();
        if (cod_operadora_s === undefined) {
            alert('Operadora deve ser informada!');
            } else {

                var sChamada = '../../nomeModulo/asp/a.asp';
        sChamada += '?indsubmit=False';
        sChamada += '&ind_filial_unidade_fixo=S';
        sChamada += '&cod_operadora_fixo=S';
        sChamada += '&cod_operadora_inc=' + $("#cod_operadora").val();
        sChamada += '&abre_modal=N';

        AbrePesquisaWindow(sChamada, 'Pesquisa_Prestador', 'Pesquisa Prestador', 700, 500, 20, 15);
            }
        }
       

    </script>
}

<form action="post" name="form01" id="form01" class="form-horizontal">

    <div class="container-fluid">
        <div class="d-flex flex-column-reverse flex-lg-row row">
            <div class="form-group">
                <div class="col-lg-9">
                    <div class="input-group input-group-sm col-lg-6">
                        <!-- NOME UNIDADE-->
                        <label class="input-group-addon" style="margin-top:30px;">Operadora</label>
                        <!-- SELECT UNIDADE-->
                        <select id="cod_operadora" class="form-control" size="5" style="height:80px;" multiple="">
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex flex-column-reverse flex-lg-row row">
            <div class="form-group">
                <div class="col-lg-9">
                    <div class="input-group input-group-sm col-lg-6">
                        <!-- REFERÊNCIA -->
                        <!-- LABEL REFERÊNCIA -->
                        <label class="input-group-addon" style="margin-top:30px;">Referência</label>
                        <!-- SELECT REFERÊNCIA -->
                        <select id="p_mes_ano_ref" name="p_mes_ano_ref" type="text" class="form-control input-md" style="height:30px; width:170px;">
                            <option value=""></option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FINAL REFERÊNCIA -->
    <!-- PRESTADOR -->
    <div class="d-flex flex-column-reverse flex-lg-row row">
        <div class="form-group">
            <div class="col-lg-9">
                <div class="input-group input-group-sm col-lg-6">
                    <!-- LABEL PRESTADOR -->
                    <label class="input-group-addon" style="margin-top:30px;">Prestador</label>
                    <!-- INPUT PRESTADOR -->
                    <input name="cod_prestador" id="cod_prestador" type="text" class="form-control" />
                    <div class="input-group-btn">
                        <a href="#" class="btn btn-default" id="buscaContrato" onclick="modal()">
                            <span class="glyphicon glyphicon-search"></span>
                        </a>
                    </div>
                    <input type="text" name="nome_prestador" id="nome_prestador" class="form-control" readonly="readonly" style="width: 200px;" />
                </div>
            </div>
        </div>
        <!--FINAL PRESTADOR-->
    </div>
    <div id="gridDemLibPgtoRev"></div>
</form>


//controller
public JsonResult GerarRelatorio(int cod_sucursal, int cod_inspetoria_ts, int qtd_meses)
{
    try {
        var Relatorio = new Model.R_md();
        //var relatorio = Relatorio.GeraRelacaoCopartBeneficiarios("<?xml version='1.0' encoding='UTF-8'?><consulta><p_mes_ano_ref>'01/2020'</p_mes_ano_ref></consulta>", "ADMIN", "8381847B89938D0D", "TS_MASTER");
        var relatorio = Relatorio.GerarPDF(cod_sucursal, cod_inspetoria_ts, qtd_meses, Session["codUsuario"].ToString(), Session["txtSenha"].ToString(), Session["aceSistema"].ToString());

                GeraRelatorios rel = new GeraRelatorios(Session["aceSistema"].ToString());
        string[] retorno = rel.GeraRelatoriosPDF(relatorio);

        return Json(new { success = retorno != null, RetornoRelatorio = retorno });
    }
    catch (Exception ex)
    {
        return Json(new { success = true, RetornoRelatorio = new string[] { "9", ex.Message } });
}
       }


public R_md GerarPDF(int cod_sucursal, int cod_inspetoria_ts, int qtd_meses, string codUsuario, string txtSenha, string txtSistema)
{
            R_md alteracaoContribuicao = new R_md();
    alteracaoContribuicao.NOME = "nomeDoPDF";
    alteracaoContribuicao.GRUPO = "nome";
    alteracaoContribuicao.MODULO = "numero";
    alteracaoContribuicao.SISTEMA = txtSistema;
    alteracaoContribuicao.USUARIO = codUsuario;
    alteracaoContribuicao.SENHA = txtSenha;

    List <PARAMETROS> nome_parametro = new List <PARAMETROS> ();

    PARAMETROS param = new PARAMETROS();
    param.Nome = "pCodSucursal";
    param.Valor = cod_sucursal.ToString();
    nome_parametro.Add(param);

    param = new PARAMETROS();
    param.Nome = "pCodInspetoriaTs";
    param.Valor = cod_inspetoria_ts.ToString();
    nome_parametro.Add(param);

    param = new PARAMETROS();
    param.Nome = "pQtdMeses";
    param.Valor = qtd_meses.ToString();
    nome_parametro.Add(param);


    alteracaoContribuicao.nome_parametroETROS = nome_parametro;

    return alteracaoContribuicao;
}

//model

public class R_md {

    public string NOME { get; set; }
        public string GRUPO { get; set; }
        public string USUARIO { get; set; }
        public string SENHA { get; set; }
        public string IP { get; set; }
        public string SISTEMA { get; set; }
        public string MODULO { get; set; }
        public List < PARAMETROS > nome_parametroETROS;

public class PARAMETROS {
    public string Nome { get; set; }
            public string Valor { get; set; }
        }

//INDEX:		

function gerarPDF() {
    var dados = {
        "cod_sucursal": $("#cod_sucursal").val(),
        "cod_inspetoria_ts": $("#cod_inspetoria_ts").val(),
        "qtd_meses": $("#qtd_meses").val(),
    };

    debugger;

    $.ajax({
        url: pathRoot + "/NomeModulo/NomeController/NomeMetodo",
        data: JSON.stringify(dados),
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        async: true,
        dataType: 'json',
        success: function (data, status) {
            debugger;
            if (data.success) {
                debugger;
                var retorno = data.RetornoRelatorio;
                if (retorno[0] == '0') {
                    limpar();
                    window.open(retorno[1]);
                } else {

                    debugger;
                    exibeMsgInformacao(retorno[1]);
                }

            } else {
                debugger;
                $.notificacoes.erro("Erro ao gerar relatório");
            }
        },
        error: function (data, status) {
            debugger;
            $.notificacoes.limpar();
            $.notificacoes.erro("Erro ao carregar - " + data.statusText);
        }
    });
}


//controller

public class NomeController : ModuloController
{

        public ActionResult Index(NomeModel model)
    {
        IList < RsSucursalModel > rsSucursal = Nome_de_sua_rotina.Get_variavel();
        IList < RsTipoProdutorModel > rsTipoProdutor = Nome_de_sua_rotina.Get_variavel2();

        ViewBag.listaTipoProdutor = new SelectList(rsTipoProdutor, "cod_tipo_produtor", "nome_tipo_produtor", String.Empty);
        ViewBag.listaSucursal = new SelectList(rsSucursal, "cod_sucursal", "nome_sucursal", String.Empty);

        return View(model);
    }


    [HttpPost]
        public ListJsonResult < dynamic > ObterDados(PesquisaProdutorModel p_parametros)
    {
        var result = Nome_de_sua_rotina.Get_variavel2(p_parametros.ToXmlStr());
        return new ListJsonResult < dynamic > (result);
    }

        public JsonResult ObterProdutor(string p_cod_corretor = null)
    {
        var produtor = Nome_de_sua_rotina.GET_VARIAVEL(p_cod_corretor);
        return Json(new { success = produtor != null, produtor = produtor });
    }


<form class="form-horizontal">

    <div class="panel panel-default col-sm-12 col-md-12 col-lg-12">
        <div class="panel-body">
            <div class="panel panel-default col-sm-12 col-md-12 col-lg-12">
                <div class="panel-body">
                    @*mês de referência*@
                    <div class="form-group">
                        <div class="col-lg-7">
                            <label class="col-lg-7 control-label" for="mes_ref" style="cursor: text">Mês de Referência</label>
                            <div class="input-group input-group-sm">
                                <input type="text" name="mes_ref" id="mes_ref" maxlength="7" tabindex="1" class="form-control" onkeydown="TeclaEnter();" onchange="ValidaMesAno();" autocomplete="off">
                                <i class="bi bi-calendar3"></i>
                            </div>
                        </div>
                    </div>
                    @*Porte Contrato*@
                    <div class="form-group">
                        <div class="col-lg-7">
                            <label class="col-lg-7 control-label" style="cursor: text">Porte Contrato</label>
                            <div class="input-group input-group-sm">
                                @Html.DropDownList("tipo_empresa", (SelectList)ViewBag.listatipo_empresa, string.Empty, new { @class = "form-control" })
                            </div>
                        </div>
                    </div>
                    @*radio Analítico/Sintático*@
                    <div class="form-group">
                        <div class="col-lg-7">
                            <!-- LABEL TIPO DE RELATORIO -->
                            <label class="col-lg-7 control-label" style="cursor: text">Tipo de Relatório</label>
                            <div class="input-group input-group-sm">
                                {/*<!-- INPUT RADIO TIPOS DE RELATORIO -->*/}

                                <label class="radio-inline">
                                    <input type="radio" id="ind_tipo_relatorioA" name="ind_tipo_relatorio" class="ind_tipo_relatorio1" value="A" tabindex="1" vertical-align:middle" checked />
                                    <b>Analítico</b>
                                </label>
                                <br />
                                <label class="radio-inline">
                                    <input type="radio" id="ind_tipo_relatorioS" name="ind_tipo_relatorio" class="ind_tipo_relatorio2" value="S" tabindex="4" vertical-align:middle" />
                                    <b>Sintético</b>
                                </label>
                                <br />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
	
<div class="container-fluid">
        {/*@*codigo do produto*@*/}
        <div class="d-flex flex-column-reverse flex-lg-row row">
            <div class="form-group">
                <div class="col-lg-2">
                    <div class="input-group input-group-sm">
                        <span class="input-group-addon" for="cod_grupo_produtor">Código</span>
						

<div class="form-group">
                <div class="col-lg-4">
                    <div class="input-group input-group-sm">
                        <span class="input-group-addon">Envio análise contra riscos </span>
                        <label class="input-group-addon" name="opcao_txt">
                            <input type="radio" id="ind_envio_undersim" name="ind_envio_under" style="margin-right: 5px;" value="S">
                            <b>sim</b>
                        </label>
                        <label class="input-group-addon" name="opcao_txt">
                            <input type="radio" id="ind_envio_undernao" name="ind_envio_under" style="margin-right: 5px;" value="N">
                            <b>não</b>
                        </label>
                    </div>
                </div>
</div>						

