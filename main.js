const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


    // ** Lay Ngay Tháng **
function Day(date){
    this.date = date
    this.month = this.date.substr(5,2)
    this.year = this.date.substr(0,4)
    this.day = this.date.substr(8,2)

    this.monthIncre = (x)=>{
        var month = Number(this.month)
        var year = Number(this.year)
        var day = Number( this.day)

        if(month+x >12){
            month = 1
            year++
            if(month==2 && day >28)
                day = 28
        }else{
            month+=x
        }
        if (day<10 && month<10){
            return `0${day}/0${month}/${year}`
        }else if (day<10 && month>=10){
            return `0${day}/${month}/${year}`
        }else if (day>=10 && month<10){
            return `${day}/0${month}/${year}`
        }
            return `${day}/${month}/${year}`
        
     
    }
    this.formatDate = ()=>{
        return `${this.day}/${this.month}/${this.year}`
    }
    this.setDate = (dates)=>{
        this.year = dates.substr(6,4)
        this.month = dates.substr(3,2)
        this.day = dates.substr(0,2)
        return `${this.year}/${this.month}/${this.day}`
    }
}

    // *** Lich Tra Tien **
const $money = $('.money')
const $month = $('.month')
const $laisuat = $('.laisuat')
const $date = $('.date')
const $btn = $('.btn-bt')
const $render = $('.details')
const _this = this
var arr = []
 
 const LichTraTien = 
    {
        bill: function(){
            var tienGoc = Math.round($money.value/$month.value)
            var tienGocConLai = $money.value
            var tienLaiPhaiTra = 0
            var count = 0
            var sum =0 
            var date = new Day($date.value).formatDate()
            var dates = new Day($date.value)
            var tempDay = ''
            for (var i = 0;i<=$month.value;i++){
            arr.push(  
            `<div class="detail">
                <div class="row-2">
                    <div class="col-15">
                        <p class="debtDay">${date}</p>
                    </div>

                     <div class="col-5">
                        <p class="number">${count}</p>
                    </div>

                     <div class="col-2">
                        <p class="tienGocConLai">${tienGocConLai}</p>
                    </div>

                    <div class="col-2">
                        <p class="Goc">${tienGoc}</p>
                    </div>

                    <div class="col-2">
                        <p class="Lai">${tienLaiPhaiTra}</p>
                    </div>

                    <div class="col-2">
                        <p class="GocVaLai">${sum}</p>
                     </div>
                </div>
            </div>`)
            date = dates.monthIncre(1)
            tempDay = dates.setDate(date)
            dates = new Day(tempDay)
            console.log($date.value,date,tempDay,dates)
            tienLaiPhaiTra = Math.round(tienGocConLai*$laisuat.value/12/100)
            tienGocConLai -=tienGoc
            sum = tienGoc+ tienLaiPhaiTra
            count++
            
            }
        },
        renderBill: function(){
            $('.details').innerHTML = arr.join('')
        },
        start: function(){
            const _this = this
            $btn.onclick = function(){
                _this.bill()
                _this.renderBill()
                arr=[]
            }
        }
    }

LichTraTien.start()

