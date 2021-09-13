<template>
	<transition name="modal">
		<div class="modal-mask day">
			<div class="modal-wrapper flex-center">
				<div class="modal-container bg-color-white-t-lv2">
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
