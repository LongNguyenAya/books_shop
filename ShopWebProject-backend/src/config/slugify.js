const slugify = require('slugify');

const generateSlug = (name, id) => {
    const baseSlug = slugify(name, {
        replacement: '-',  
        remove: /[*+~.()'"!:@]/g, 
        lower: true,      
        strict: true,     // Xóa các ký tự không phải chữ cái/số (trừ replacement)
        locale: 'vi',    
        trim: true       
    });

    // Cộng thêm ID vào cuối slug để đảm bảo tính duy nhất
    return `${baseSlug}-${id}`; 
};

module.exports = generateSlug;