# Redux-SpendMoney
Patika.dev Redux modülü "Spend Money Project" çalışması.

* Proje redux store ve slice mantığı ile oluşturuldu. react-redux ve reduxjs/toolkit paketleri kullanıldı. ```MockAPI``` 'dan fake JSON dosyası oluşturularak veriler ```createAsyncThunk``` ile çekildi. [https://mockapi.io](https://mockapi.io)

* Projede buy butonuna basıldığında 100 milyardan eksilir ve count değerimiz artmaktadır, count = 0 ise sell butonumuz disable, sell butonuna basıp satış yaptığımızda money değerimiz artmaktadır. Alacağımız item fiyatı money fiyatımızdan yüksekse ekranda alert oluşmaktadır. Alınan her bir ürün miktarı ve fiyatı ile aşağıda listelenmektedir. 

![ss-1](/public/assets/ss-1.png)
![ss-2](/public/assets/ss-2.png)
![ss-3](/public/assets/ss-3.png)
![ss-4](/public/assets/ss-4.png)

