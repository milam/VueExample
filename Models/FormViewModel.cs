using VueContactTableExample.Models;
public class FormViewModel
{
    public FormFields Fields { get; set; }
}

public class FormFields
{ 
    public ContactModel[] Contacts { get; set; }
}