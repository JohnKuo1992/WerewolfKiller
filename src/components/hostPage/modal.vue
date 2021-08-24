<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper flex-center">
				<div class="modal-container">
					<div class="modal-header-custom text-center p-1">
						<slot name="header">
							<!-- default header -->
						</slot>
					</div>
					<div class="modal-body-custom p-1">
						<slot name="body">
							<!-- default body -->
						</slot>
					</div>
					<div class="modal-footer-custom">
						<slot name="footer" class="flex-center">
							<!-- default footer -->
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: "modal",
};
</script>
