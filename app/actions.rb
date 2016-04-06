# Homepage (Root path)
get '/' do
  erb :index
end

post '/api/v1/create' do
  @new_contact = Contact.new(
    first_name: params[:firstname],
    last_name: params[:lastname],
    email: params[:email],
    phone: params[:phone]
  )
  @new_contact.save

end

get '/api/v1/viewall' do
  @contacts = Contact.all
  content_type :json
 @contacts.to_json
end

post '/api/v1/destory' do
  @contact = Contact.all.find(params[:id])
  @contact.destory
end