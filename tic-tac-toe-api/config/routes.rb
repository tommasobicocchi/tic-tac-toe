Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get 'games' => 'games#index'
      post 'games' => 'games#create'
    end
  end
end
