function documentReady()
 {
     $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
                $(this).toggleClass('active'); 
                
            });
            
};



// <!-- 
// <script type="text/javascript"> 
//   $(document).ready(function () {
//     $('#sidebarCollapse').on('click', function () {
//       console.log("Welcome");
//       $('#sidebar').toggleClass('active');
//       $('#sidebarCollapse').toggleClass('active'); 
     
//       // $(this).toggleClass('active');
      
//     });
//   });

// </script> -->