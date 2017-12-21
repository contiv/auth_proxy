#service script
unset opt
while getopts c opt; do
	case $opt in
		c)
	      docker exec -it $(docker run -itd --net=client-net  contiv/alpine sh) sh -c "nc -znvw 1 100.1.1.3 8080"
	      docker exec -it $(docker run -itd --net=client-net  contiv/alpine sh) sh -c "nc -znvw 1 100.1.1.3 8080"
	      docker exec -it $(docker run -itd --net=client-net  contiv/alpine sh) sh -c "nc -znvw 1 100.1.1.3 8080"
	      ;;
    esac
done

if [ $# -eq 0 ];
then
   	netctl net create contiv-srv-net -s 100.1.1.0/24

	#app-svc service
	netctl service create app-svc --ip 100.1.1.3 --network contiv-srv-net --tenant default --selector=tier=web --selector=release=stable --selector=environment=prod --port 8080:80:TCP
	netctl net create contiv-net -s 10.1.1.0/24 -g 10.1.1.254
	for i in `seq 1 14`;
        do
        	docker exec -it $(docker run -itd --net=contiv-net --label=tier=web --label=release=stable --label=environment=prod --label=version=1.0 contiv/alpine sh) sh -c "nc -l -p 80 &"
        done 


    #app-db service
	netctl service create app-db --ip 100.1.1.4 --network contiv-srv-net --tenant default --selector=tier=db --selector=release=stable --selector=environment=prod --port 8080:80:TCP
    for i in `seq 1 3`;
    	do
			docker exec -it $(docker run -itd --net=contiv-net --label=tier=db --label=release=stable --label=environment=prod --label=version=1.0 contiv/alpine sh) sh -c "nc -l -p 80 &"
		done

	netctl net create client-net -s 11.1.1.0/24 -g 11.1.1.254

	#endpoint to app-svc
	docker exec -it $(docker run -itd --net=client-net  contiv/alpine sh) sh -c "nc -znvw 1 100.1.1.3 8080"
	docker exec -it $(docker run -itd --net=client-net  contiv/alpine sh) sh -c "nc -znvw 1 100.1.1.3 8080"
	docker exec -it $(docker run -itd --net=client-net  contiv/alpine sh) sh -c "nc -znvw 1 100.1.1.3 8080"

	#endpoint to app-db
	docker exec -it $(docker run -itd --net=client-net  contiv/alpine sh) sh -c "nc -znvw 1 100.1.1.4 8080"
fi
exit

