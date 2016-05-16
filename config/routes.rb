Rails.application.routes.draw do


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'page#travelnote'

  resources :letters

  
  get '/letter' => 'page#letter' ,:as=>'letterlist'
  get '/music' => 'page#music'
  get '/video' => 'page#video'
  get '/book' => 'page#book'
  get '/digest' => 'page#digest'
  get '/image' => 'page#image'
  get '/about' => 'page#about'

  get 'signup' => 'users#signup' , :as => 'signup'
  get 'login' => 'users#login' , :as => 'login'
  # user
  post '/create_login_session' => 'users#create_login_session'
  delete 'logout' => 'users#logout' , :as => "logout"

  resources :users , only: [:create]
   # issues
  resources :issues
  
  

  
  # songs
   get '/songs/:id' => "songs#show", :as => "song"
   
   # get '/letter/1' => "letters#show1"
   # get '/letter/2' => "letters#show2"
   # get '/letter/3' => "letters#show3"
   # get '/letter/4' => "letters#show4"
   # get '/letter/5' => "letters#show5"
   # get '/letter/6' => "letters#show6"
   # get '/letter/7' => "letters#show7"
   # get '/letter/8' => "letters#show8"
  # comments
  post '/issues/:issue_id/comments' => 'comments#create'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
